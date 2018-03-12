import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material";

import {DbService} from "../../shared/services/db.service";

@Component({
  selector: 'ccc-rich-list',
  templateUrl: './rich-list.component.html',
  styleUrls: ['./rich-list.component.scss']
})
export class RichListComponent implements OnInit {
  currentBalanceStatus: string = '';
  startBalanceChanges: string = '';
  balanceNotRead: boolean = false;
  balancesFull: any = [];
  balancesAllChange: any = [];

  //math data
    balanceDevider = 100000000;

    //name of all balances field in DB
    balanceDBField = 'balance';
    balancesDBField = 'balances';

    //table data
    displayedColumns = ['id', 'address', 'balance', 'difference'];

/*    @ViewChild('balanceSingle') balanceSingle: ElementRef;*/

  constructor(
      private dbService: DbService
  ) { }

  ngOnInit() {
    this.getRichList();

        this.dbService.testFirebase('balances')
            .subscribe((result) => {
                console.log('BALANCES', result);
            });
  }

  getRichList() {
    //parse page with 100 bitcoin addreses by selector
    this.dbService.parseRichList().then((response) => {
      //parse variable
        //console.log(response);

        //get table by id(regex)
      const tableAddresses = response.match(/<table[^>]*id="tblOne".*>.*<\/table>/)[0],
          //regex for parse links with btc wallets addresses
          regex = /<a\shref="https:\/\/bitinfocharts.com\/ru\/bitcoin\/address\/(.*?)".*?>/g,
          //match this links by regex
          linkMatch = response.match(regex),
          matchAddresses = [];

      //get part with btc wallet address and push it to array
        linkMatch.forEach((item) => {
            item.replace(/address\/(.*[^">])/, '$1');
            matchAddresses.push(RegExp.$1);
        });

        console.log(matchAddresses);


      /*
       const html = document.createElement('html');
      html.innerHTML = tableAddresses;
        const selectorLinks = 'a[href^="https://bitinfocharts.com/ru/bitcoin/address/qqq"]';
      const links = html.querySelectorAll(selectorLinks);*/

      //loop parse variable
      /*const countAddresses = 10,
          responseTime = 2500;

      //loops counters variable
      let counter = 0;
      let balancesFullCounter = 0;

      const promise = new Promise((resolve, reject) => {
        let balance = 0;

        for (let a = 1; a <= links.length / countAddresses; a++) {

          setTimeout(() => {
            const address: any = [];
            for (let i = 0; i < countAddresses; i++) {

              address[i] = (links[counter + i] as HTMLAnchorElement).pathname.replace('/', '');
              console.log('address', address[i], i);
            }

            //get address information
            this.dbService.getRichValues(address.join(',').toString(58)).then((value) => {
              //console.log(value);

                //if wallat address is not wrong
                if (value['data'] !== null) {
                    value['data'].forEach((item, index) => {

                        item.id = balancesFullCounter;
                        this.balancesFull.push(item);

                        balance += item.balance / this.balanceDevider;
                        console.log(this.balanceNotRead);
                        if (responseTime * a === responseTime * links.length / countAddresses) {
                            resolve(balance);
                        }
                        balancesFullCounter++;
                    });
                } else {
                  console.log('Wallet address is wrong!');
                    this.balancesFull.push({
                        balance: 0,
                        wrong: true
                    });
                }
            }).catch((err: any) => {
              console.log(err);
              this.balanceNotRead = true;
            });
            console.log(counter);
            counter += countAddresses;
          }, responseTime * a);

        }

      });*/



        //loop parse variable
        const countAddresses = 18,
            responseTime = 2500;

        //loops counters variable
        let counter = 0;
        let balancesFullCounter = 0;

        //promise for view information of balances
        const promise = new Promise((resolve, reject) => {
            let balance = 0;

            //divide matched addresses to 10 part of 10(all 100 items)
            for (let a = 1; a <= Math.ceil(matchAddresses.length / countAddresses); a++) {

                setTimeout(() => {
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

                    //get address information(addresses sends by 10 items in one string to API)
                    this.dbService.getRichValues(address.join(',')).then((value) => {
                        console.log(value);

                        //if wallat address is not wrong
                        if (value['data'] !== null) {
                            value['data'].forEach((item, index) => {

                                //add id to balance address
                                item.id = balancesFullCounter;

                                //push this item to array
                                this.balancesFull.push(item);

                                //float balance(satoshi part)
                                balance += item.balance / this.balanceDevider;
                                console.log(this.balanceNotRead);
                                //if loop is end - send promise full balance
                                if (responseTime * a === responseTime * Math.ceil(matchAddresses.length / countAddresses)) {
                                    resolve(balance);
                                }
                                balancesFullCounter++;
                            });
                        } else {
                            console.log('Wallet address is wrong!');
                            this.balancesFull.push({
                                balance: 0,
                                wrong: true
                            });
                        }
                    }).catch((err: any) => {
                        console.log(err);
                        this.balanceNotRead = true;
                        this.balancesFull = [];
                    });
                    console.log(counter);
                    counter += countAddresses;
                }, responseTime * a);

            }

        });

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
                      /*.subscribe((result) => {
                        console.log('All new balances Added');
                      });*/
                } else {

                    let index = 0;
                    const responseObj = responseCheck[0],
                        balancesNew = [];

                    for (const i in responseObj) {
                        if (responseObj.hasOwnProperty(i) && i !== 'key') {

                            let difference = '',
                                status = '';
                            const balanceNew = this.balancesFull[index].balance / this.balanceDevider,
                                addressNew = this.balancesFull[index].address;

                            console.log(`BAL ${index + 1}`, balanceNew, responseObj[i].balance);

                            //compare addresses and add difference & status to them
                            if (this.balancesFull[index].address !== responseObj[i].address) {

                                difference = '' + 0;
                                status = 'new';
                            } else {
                                //add status to balance item if 'balance' in DB different with coming 'balance'
                                if (balanceNew > responseObj[i].balance) {
                                    difference = '+' + (balanceNew - responseObj[i].balance);
                                    status = 'positive';

                                } else if (balanceNew < responseObj[i].balance) {
                                    difference = '-' + (responseObj[i].balance - balanceNew);
                                    status = 'negative';

                                } else {
                                    difference = '' + 0;
                                    status = 'stable';
                                }
                            }

                            //add difference to item in new array
                            this.balancesFull[index].difference = difference;
                            this.balancesFull[index].status = status;
                            this.balancesFull[index].address = addressNew;
                            this.balancesFull[index].balance = balanceNew;

                            //add item to new array
                            balancesNew.push(this.balancesFull[index]);

                            index++;
                        }
                    }

                    /*responseCheck[0].forEach((item, index) => {

                        let difference = '',
                            status = '';

                        //compare addresses and add difference & status to them
                        if (item.address !== this.balancesFull[index].address) {

                            difference = '' + 0;
                            status = 'new';
                        } else {
                            //add status to balance item if 'balance' in DB different with coming 'balance'
                            if (this.balancesFull[index].balance > item.balance) {
                                difference = '+' + (this.balancesFull[index].balance - item.balance) / this.balanceDevider;
                                status = 'positive';

                            } else if (this.balancesFull[index].balance < item.balance) {
                                difference = '-' + (item.balance - this.balancesFull[index].balance) / this.balanceDevider;
                                status = 'negative';

                            } else {
                                difference = '' + 0;
                                status = 'stable';
                            }
                        }

                        //add difference to item in new array
                        this.balancesFull[index].difference = difference;
                        this.balancesFull[index].status = status;

                        //add item to new array
                        balancesNew.push(this.balancesFull[index]);
                  });*/
                    //console.log('balancesNew', balancesNew);

                    //rewrite balances in DB
                    this.dbService.setDBBalances(this.balancesDBField, responseObj.key, balancesNew)
                        /*.subscribe((result) => {
                            console.log('All new balances Changed');
                        });*/

                    this.balancesAllChange = new MatTableDataSource(balancesNew);
                }
              })
              /*.catch((err: any) => {
                console.log(err);
              });*/
          this.compareDBBalance(balance);
        } else {
          this.getRichList();
          this.balanceNotRead = false;
        }
        console.log('BalancesFull', this.balancesFull);
      });

    }).catch((err: any) => {
      console.log(err);
    });
  }

  compareDBBalance(balance) {
    this.dbService.getDBBalance(this.balanceDBField)
        .subscribe((response: any) => {
          const currentDBBalance = response[0].amount,
              startFollowingPosition = response[1].start_position;

          if (currentDBBalance < balance || currentDBBalance > balance) {
            const changeSum = -(currentDBBalance - balance);
            this.currentBalanceStatus = `Balance changed: ${balance} (${currentDBBalance}). Change sum: ${this.compareBalances(currentDBBalance, balance)}`;
            this.changeDBBalance(response[0].key, balance);
            this.startBalanceChanges = `Start following balance changed: ${this.compareBalances(startFollowingPosition, balance)
                }`;
          } else {
            this.currentBalanceStatus = `Balance not changed`;
          }
        });
  }

  changeDBBalance(key, currentBalance) {
    const body = {
      'amount': currentBalance
    };
    this.dbService.updateDBBalance(this.balanceDBField, key, body);
        /*.subscribe((response: any) => {
          console.log(response);
        });*/
  }

  compareBalances(startBalance, currentBalance) {
    return -(startBalance - currentBalance);
  }

}
