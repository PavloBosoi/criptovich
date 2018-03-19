import {Component, OnInit, EventEmitter, Input} from '@angular/core';
import {DbService} from "../../../shared/services/db.service";
import {SharedDataService} from "../../shared/services/shared-data.service";
import {DataService} from "../../../shared/services/data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'ccc-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

  currentBalanceStatus: string = '';
  startBalanceChanges: string = '';
  bitcoinMarketShare: number = 0;

  //name of all balances field in DB
  balanceDBField = 'balance';

  //Total data
  startFollowingBalance: number = 0;
  totalChangedBalance: number = 0;
  totalChangeSum: number = 0;

  constructor(
      private dbService: DbService,
      private shareDataService: SharedDataService,
      private dataService: DataService
  ) { }

  ngOnInit() {
    this.totalBalance();
  }

  totalBalance() {
    this.shareDataService.onTotalBalance
        .subscribe((newTotalbalance) => {
      const coin = 'bitcoin';

      this.dbService.getDBBalance(this.balanceDBField)
          .subscribe((response: any) => {
            const currentDBBalance = response[0].amount,
                startFollowingPosition = response[1].start_position;

            if (currentDBBalance < newTotalbalance || currentDBBalance > newTotalbalance) {
              const changeSum = -(currentDBBalance - newTotalbalance);
              this.currentBalanceStatus = `Balance changed: ${newTotalbalance} (${currentDBBalance}). Change sum: ${this.compareBalances(currentDBBalance, newTotalbalance)}`;
              this.changeDBBalance(response[0].key, newTotalbalance);
              this.startBalanceChanges = `Start following balance changed: ${this.compareBalances(startFollowingPosition, newTotalbalance)}`;
            } else {
              this.currentBalanceStatus = `Balance not changed: ${newTotalbalance}`;
              this.startBalanceChanges = `Start following balance changed: ${this.compareBalances(startFollowingPosition, newTotalbalance)}`;
            }

            //market share of coin
            this.coinMarketShare(coin, newTotalbalance)
                .subscribe((percent) => {
                  console.log(percent);
                  this.bitcoinMarketShare = percent;
                });
          });

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

  coinMarketShare(coin, balance) {
    let resultProcent = 0;

    return this.dataService.getCoinMarketcap(coin)
        .map((response: any) => {
          let availableSupply = +response[0].available_supply;

          //get a market share in percents
          resultProcent = balance/availableSupply * 100;

          return Math.round(resultProcent);
        });
  }

}
