import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {AnnounceService} from "../../shared/services/announce.service";

@Component({
    selector: 'ccc-announce',
    templateUrl: 'announce.component.html',
    styleUrls: ['./announce.component.scss']
})

export class AnnounceComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    resultTwitter: any = [];
    resultTwitterMarketcap: any;
    @ViewChild('searchValue') searchValue: ElementRef;

    constructor(
        private routerService: Router,
        private announceService: AnnounceService
    ) {}

    ngOnInit() {
        /*this.getDataCoindar();
        this.getDataMarketcap();*/
        //this.routerService.navigate((['/login']));


        this.getDataTwitterMarketcap();

    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }

    getDataCoindar() {
        this.subscription = this.announceService.getAnnounceCoindar()
            .subscribe((response: any) => {
                console.log(response);
            });
    }

    getAuthTwitter(searchValue) {
        this.subscription = this.announceService.authTwitter()
            .subscribe((response: any) => {
                console.log(response);
                this.getDataTwitter(response.access_token, searchValue);
            });
    }

    getDataTwitter(token, value) {
        console.log(value);
        this.subscription = this.announceService.getAnnounceTwitter(token, value)
            .subscribe((response: any) => {
            this.resultTwitter = response.statuses;
                console.log(response);
            });
    }
    getDataMarketcap() {
        this.subscription = this.announceService.getAnnounceMarketcap()
            .subscribe((response: any) => {
                console.log(response);
            });
    }

    getDataTwitterMarketcap() {
        this.announceService.authTwitter()
            .subscribe((response: any) => {
                this.announceService.getAnnounceMarketcap()
                    .subscribe((response2: any) => {
                        response2.forEach((item, i) => {
                            console.log(item.symbol);
                            this.announceService.getAnnounceTwitter(response.access_token, item.symbol)
                                .subscribe((response3: any) => {
                                    response3.statuses.forEach((item2) => {
                                        //console.log(item2);
                                        this.resultTwitter.push(item2);
                                    });
                                    //this.resultTwitter.push(response3.statuses);
                                    //console.log(response3.statuses);
                                    //this.resultTwitterMarketcap = response3.statuses;
                                });
                        });
                    });
            });
    }

    searchAnnounce(event, searchValue) {
        this.getAuthTwitter(searchValue.value);
    }

}
