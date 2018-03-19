import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

  constructor(
      private http: HttpClient
  ) { }

  getCoinMarketcap(coin) {
    return this.http.get('/v1/ticker/' + coin);
  }

}
