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

    testFirebase(fieldName) {
        return this.firebase.list(fieldName).snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
        });
    }

    setDBBalances(fieldName: string, key: string, newBalances: any) {
      this.firebase.list(fieldName).set(key, newBalances);
    }

    updateDBBalance(fieldName: string, key: string, value: any) {
        this.firebase.list(fieldName).update(key, value);
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
