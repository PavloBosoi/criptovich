import {Component, OnInit} from '@angular/core';

import {DbService} from "../../shared/services/db.service";

@Component({
  selector: 'ccc-rich-list',
  templateUrl: './rich-list.component.html',
  styleUrls: ['./rich-list.component.scss']
})
export class RichListComponent implements OnInit {
    matchAddresses: any = [];

  constructor(
      private dbService: DbService
  ) { }

  ngOnInit() {


      this.dbService.parseRichList().then((response) => {
          this.parseAddresses(response);
      });
  }

    parseAddresses(parseString: string) {
        //get table by id(regex)
        const tableAddresses = parseString.match(/<table[^>]*id="tblOne".*>.*<\/table>/)[0],
            //regex for parse links with btc wallets addresses
            regex = /<a\shref="https:\/\/bitinfocharts.com\/ru\/bitcoin\/address\/(.*?)".*?>/g,
            //match this links by regex
            linkMatch = parseString.match(regex),
            addresses = [];

        //get part with btc wallet address and push it to array
        linkMatch.forEach((item) => {
            item.replace(/address\/(.*[^">])/, '$1');
            addresses.push(RegExp.$1);
        });

        this.matchAddresses = addresses;
    }

}
