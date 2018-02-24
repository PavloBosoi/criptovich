import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {AnnounceService} from "../../shared/services/announce.service";

@Component({
    selector: 'ccc-announce',
    templateUrl: 'announce.component.html',
    styleUrls: ['./announce.component.scss']
})

export class AnnounceComponent implements OnInit, OnDestroy{
    subscription: Subscription;
    resultTwitter: any = [];
    balance: any = [];
    resultTwitterMarketcap: any;
    @ViewChild('searcValue') searcValue: ElementRef;

    constructor(
        private routerService: Router,
        private announceService: AnnounceService
    ) {}

    ngOnInit() {
        /*this.getDataCoindar();
        this.getDataMarketcap();*/
        //this.routerService.navigate((['/login']));


        this.getDataTwitterMarketcap();





        this.getRichList();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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









//++++++++++++++++++++++++

/*    getRichList() {
        this.announceService.parseRichList().then((response) => {
            console.log(response);
        }).catch((err: any) => {

            const html = document.createElement('html');
            html.innerHTML = err.error.text;
            const nodes = html.querySelectorAll('[ga-type]');
            let links = [];

            for (let i = 0; i < nodes.length; i++) {
                links.push(nodes[i].innerHTML.trim())
            }


            const getRequest = (links) => {
                setTimeout(() => {
                    const length = links.length;
                    const amount = (length < 10) ? (length - 10) : 10

                    this.announceService.getRichValues(links.slice(length-amount).join(',')).subscribe((response) => {
                        console.log(response);
                    });

                    if (links.length) getRequest(links.slice(0, length-amount)) else return;

                }, 2000);
            }
            getRequest(links);
        });
    }*/


    getRichList() {
        this.announceService.parseRichList().then((response) => {
            console.log(response);
        }).catch((err: any) => {

            const html = document.createElement('html');
            html.innerHTML = err.error.text;
            const links = html.querySelectorAll('[ga-type]');
            const countAddresses = 10;
            let counter = 0;

            let promise = new Promise((resolve, reject) => {
                let balance: number = 0;

                    for(let a = 1; a <= links.length / countAddresses; a++){

                        setTimeout(()=>{
                            let address: any = [];
                            for (let i = 0; i < countAddresses; i++) {

                                //address[i] = links[counter + i].innerHTML.trim();

                                //console.log(links[counter + i].pathname.replace('/',''));

                                address[i] = links[counter + i].pathname.replace('/','');
                            }

                            this.announceService.getRichValues(address.join(',')).subscribe((response) => {
                                console.log(response.data);
                                response.data.forEach((item, i) => {
                                    balance += item.balance/100000000;
                                });
                            });
                            console.log(counter);
                            counter += countAddresses;
                        }, 1500 * a);

                    }
                setTimeout(()=> {
                    resolve(balance);
                }, 2000 * links.length / countAddresses);

            });

            promise.then((response) => {
                console.log('response',response);
                //let sum = response.reduce((a, b) => a + b, 0);
                //console.log(response);
            });


        });
    }

}
