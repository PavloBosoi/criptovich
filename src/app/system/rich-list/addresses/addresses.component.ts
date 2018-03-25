import {Component, OnInit, Input, EventEmitter, Output, OnDestroy} from '@angular/core';
import {DbService} from "../../../shared/services/db.service";
import {MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";

import {SharedDataService} from "../../shared/services/shared-data.service";

@Component({
  selector: 'ccc-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  @Input('matchAddresses') matchAddresses: any;

  balanceNotRead: boolean = false;
  balancesFull: any = [];
  balancesAllChange: any = [];

  //math data
  balanceDevider = 100000000;

  //name of all balances field in DB
  balancesDBField = 'balances';

  //table data
  displayedColumns = ['id', 'address', 'balance', 'difference'];

  constructor(
      private dbService: DbService,
      private shareDataService: SharedDataService,
      private routerService: Router
  ) { }

  ngOnInit() {

    this.getRichList();
  }

  getRichList() {
    //parse page with 100 bitcoin addreses by selector
    this.dbService.parseRichList().then((response) => {

      const matchAddresses = this.matchAddresses;

      //loop parse variable
      const countAddresses = 18,
          responseTime = 2500;

      //loops counters variable
      let counter = 0;
      let BalancesIds = 0;

      //promise for view information of balances
      const promise = new Promise((resolve, reject) => {
        let balance = 0;

        //divide matched addresses to 10 part of 10(all 100 items)
        for (let a = 1; a <= Math.ceil(matchAddresses.length / countAddresses); a++) {

          let timeoutLoop = setTimeout(() => {
            const address: any = [];
            //add all addresses to new array starts from ends item last time
            for (let i = 0; i < countAddresses; i++) {
              //check on undefined address when loop over than addresses exist(100)
              if (typeof matchAddresses[counter + i] !== 'undefined') {
                //for example 0+1, 0+2...10+1...40+1
                address[i] = matchAddresses[counter + i];
              } else {
                break;
              }
            }

            //if not catch error in respond get data
            if(!this.balanceNotRead){
              //get address information(addresses sends by 18 items in one string to API)
              this.dbService.getRichValues(address.join(',')).then((value) => {
                console.log('getRichValues', value);

                //if wallat address is not wrong
                if (value['data'] !== null) {
                  value['data'].forEach((item, index) => {

                    //add id to balance address
                    item.id = BalancesIds;

                    //push this item to array
                    this.balancesFull.push(item);

                    //float balance(satoshi part)
                    balance += item.balance / this.balanceDevider;

                    //if loop is end - send promise full balance
                    if (responseTime * a === responseTime * Math.ceil(matchAddresses.length / countAddresses)) {
                      resolve(balance);
                    }
                    BalancesIds++;
                  });
                } else {
                  console.log('Wallet address is wrong!');
                  this.balancesFull.push({
                    balance: 0,
                    wrong: true
                  });
                }
              }).catch((err: any) => {
                this.balanceNotRead = true;
                this.balancesFull = [];
              });
              console.log(counter);
            } else {
              //send resolve that promise worked
              resolve(balance);
            }
            counter += countAddresses;

          }, responseTime * a);

          //if route to another page clear timeout
          this.routerService.events.subscribe(() => {
            clearTimeout(timeoutLoop);
            return;
          });

        }

      });

      //changes after promise in addresses balances
      this.changeBalancesPromise(promise);

    }).catch((err: any) => {
      console.log(err);
    });
  }

  changeBalancesPromise(promise: Promise<any>) {
    promise.then((balance) => {
      //if all balances responsed from API successful
      if (!this.balanceNotRead) {

        //check all balances in DB
        this.dbService.getDBBalance(this.balancesDBField)
            .subscribe((responseCheck: any) => {
              //if balances is empty - add new value balances responsed from API to DB
              if (responseCheck.length === 0) {
                console.log('!checkBalanceInDB', responseCheck);
                this.dbService.insertBalancesToDB(this.balancesDBField, this.balancesFull);
              } else {

                let index = 0;
                const responseObj = responseCheck[0],
                    balancesNew = [];

                for (const i in responseObj) {
                  if (responseObj.hasOwnProperty(i) && i !== 'key') {

                    let difference = '',
                        status = '',
                        oldAddress = '';
                    const balanceNew = this.balancesFull[index].balance / this.balanceDevider,
                        addressNew = this.balancesFull[index].address;

                    console.log(`BAL ${index + 1}`, balanceNew, responseObj[i].balance);

                    //compare addresses and add difference & status to them
                    if (this.balancesFull[index].address !== responseObj[i].address) {

                      difference = (balanceNew - responseObj[i].balance) > 0 ? '+' + (balanceNew - responseObj[i].balance) : '-' + (responseObj[i].balance - balanceNew);
                      status = 'new';
                      oldAddress = responseObj[i].address;
                    } else {
                      //add status to balance item if 'balance' in DB different with coming 'balance'
                      if (balanceNew > responseObj[i].balance) {
                        difference = '+' + (balanceNew - responseObj[i].balance);
                        status = 'positive';
                        oldAddress = '';

                      } else if (balanceNew < responseObj[i].balance) {
                        difference = '-' + (responseObj[i].balance - balanceNew);
                        status = 'negative';
                        oldAddress = '';

                      } else {
                        difference = '' + 0;
                        status = 'stable';
                        oldAddress = '';
                      }
                    }

                    //add difference to item in new array
                    this.balancesFull[index].difference = difference;
                    this.balancesFull[index].status = status;
                    this.balancesFull[index].address = addressNew;
                    this.balancesFull[index].oldAddress = oldAddress;
                    this.balancesFull[index].balance = balanceNew;

                    //add item to new array
                    balancesNew.push(this.balancesFull[index]);

                    index++;
                  }
                }

                //rewrite balances in DB
                this.dbService.setDBBalances(this.balancesDBField, responseObj.key, balancesNew);

                console.log(balancesNew);

                this.balancesAllChange = new MatTableDataSource(balancesNew);
              }
            });

        //this.totalBalance(balance);
        this.shareDataService.changeTotalBalance(balance);
        //this.addressesBalance.emit(balance);

      } else {
        this.getRichList();
        this.balanceNotRead = false;
      }
      console.log('BalancesFull', this.balancesFull);

    });
  }

  ngOnDestroy() {

  }

}
