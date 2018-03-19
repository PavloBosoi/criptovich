import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class SharedDataService {
  onTotalBalance: EventEmitter<number> = new EventEmitter();

  constructor() { }

  changeTotalBalance(totalBalance) {
    this.onTotalBalance.emit(totalBalance);
  }

}
