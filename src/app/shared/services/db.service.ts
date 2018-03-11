import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class DbService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  dbList: AngularFireList<any>;

  constructor(
      private http: HttpClient,
      private firebase: AngularFireDatabase
  ) {

  }

  parseRichList() {
    return this.http.get('/ru/top-100-richest-bitcoin-addresses.html', {responseType: 'text'}).toPromise();
  }

  getRichValues(address) {
    return this.http.get('/v3/address/' + address).toPromise();
  }

/*  getDBBalance() {
      return this.http.get('//localhost:3000/balance');
    }
 postBalancesToDB(fieldName, balances) {
    return this.http.post('//localhost:3000/' + fieldName, balances, {headers: this.headers});
 }
   checkBalanceInDB(fieldName) {
    return this.http.get('//localhost:3000/' + fieldName).toPromise();
  }
    putDBBalance(balance) {
    return this.http.put('//localhost:3000/balance/1', balance, {headers: this.headers});
  }

  putDBBalances(fieldName, balances) {
    return this.http.put('//localhost:3000/balances', balances, {headers: this.headers});
  }
  */

    putDBBalance(balance) {
        return this.http.put('//localhost:3000/balance/1', balance, {headers: this.headers});
    }

    putDBBalances(fieldName, balances) {
        return this.http.put('//localhost:3000/balances', balances, {headers: this.headers});
    }

    testFirebase(fieldName) {
        return this.firebase.list(fieldName).snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    updateDBBalances(fieldName: string, key: string, newBalances: any) {
      this.firebase.list(fieldName).set(key, newBalances);
    }

  insertBalancesToDB(fieldName, balances) {
    //return this.http.post('//localhost:3000/' + fieldName, balances, {headers: this.headers});
    this.firebase.list(fieldName)
        .push(balances);
  }

  getDBBalance(fieldName) {
    //return this.firebase.list(fieldName).valueChanges();
      return this.firebase.list(fieldName).snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

}
