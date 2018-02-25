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
    currentBalanceStatus: string = '';
    startBalanceChanges: string = '';
    balanseNotRead: boolean = false;
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

            const html = document.createElement('html');
            html.innerHTML = response;
            const links = html.querySelectorAll('[ga-type]');
            const countAddresses = 10,
                responseTime = 2500;
            let counter = 0;

            const promise = new Promise((resolve, reject) => {
                let balance = 0;

                for (let a = 1; a <= links.length / countAddresses; a++) {

                    setTimeout(() => {
                        const address: any = [];
                        for (let i = 0; i < countAddresses; i++) {

                            address[i] = (links[counter + i] as HTMLAnchorElement).pathname.replace('/', '');
                        }

                        this.announceService.getRichValues(address.join(',')).then((value) => {
                            console.log(value);
                            value['data'].forEach((item, i) => {
                                balance += item.balance / 100000000;
                                console.log(this.balanseNotRead);
                                if (responseTime * a === responseTime * links.length / countAddresses) {
                                    resolve(balance);
                                }
                            });
                        }).catch((err: any) => {
                            console.log(err);
                            this.balanseNotRead = true;
                        });
                        console.log(counter);
                        counter += countAddresses;
                    }, responseTime * a);

                }

                /*setTimeout(() => {
                    resolve(balance);
                }, 2500 * links.length / countAddresses);*/

            });

            promise.then((balance) => {
                if (!this.balanseNotRead) {
                    this.compareDBBalance(balance);
                } else {
                    this.getRichList();
                    this.balanseNotRead = false;
                }
                console.log('isBalanceRead', this.balanseNotRead);
            });

        }).catch((err: any) => {
            console.log(err);
        });
    }

    compareDBBalance(balance) {
        this.announceService.getDBBalance()
            .subscribe((response: any) => {

            const currentDBBalance = response[0].amount,
                startFollowingPosition = response[1].start_position;

                console.log('getDBBalance', startFollowingPosition);

                if (currentDBBalance < balance || currentDBBalance > balance) {
                    const changeSum = -(currentDBBalance - balance);
                    this.currentBalanceStatus = `Balance changed: ${balance} (${currentDBBalance}). Change sum: ${this.compareBalances(currentDBBalance, balance)}`;
                    //this.changeDBBalance(balance);
                    this.startBalanceChanges = `Start following balance changed: ${this.compareBalances(startFollowingPosition, balance)}`;
                } else {
                    this.currentBalanceStatus = `Balance not changed`;
                }
            });
    }

    changeDBBalance(currentBalance) {
        const body = {
            'amount': currentBalance
        };
        this.announceService.postDBBalance(body)
            .subscribe((response: any) => {
                console.log(response);
            });
    }

    compareBalances(startBalance, currentBalance) {
        return -(startBalance - currentBalance);
    }

}
