import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()

export class AnnounceService {
    constructor(
        private http: HttpClient
    ) {}

    getAnnounceCoindar(): Observable<any> {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/X-www-form-urlencoded'
        });
        return this.http.get('/api/v1/lastEvents');
    }



    getAnnounceTwitter(token: string, value: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        const body = {
            Token: token
        };
        const query = 'partnership OR airdrop OR listing OR lists OR exchange OR conference OR meetup OR major OR alpha OR beta OR wallet OR announcement OR announce OR launch OR roadmap min_retweets:10 min_faves:20#' + value + ' #cryptocurrency-#btc -#bitcoin';
        return this.http.get('/1.1/search/tweets.json?q=' + encodeURIComponent(query) + '&result_type=recent', {headers: headers});
    }

    authTwitter(): Observable<any> {
        const apiKey = encodeURIComponent('2whYiur6dvJnmqRuWQnqNCtU4');
        const apiKeySecret = encodeURIComponent('YYqCVZGUdsRO92honEL3tVjRUJHSmgzpBVYIIaS1vrsNLTTe8u');
        const encoded = btoa(apiKey + ':' + apiKeySecret);
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + encoded
        });
        return this.http.post('/oauth2/token', 'grant_type=client_credentials', {headers: headers});
    }

    /*getAnnounce() {
        const headers = new Headers({
            'Access-Control-Allow-Origin': '*'
        });
        return this.http.get('/api/v1/lastEvents')
            .map((res: Response) => res.json());
    }*/

    getAnnounceMarketcap() {
        return this.http.get('/v1/ticker/?start=100&limit=20');
    }




//++++++++++++++++++++++++
    parseRichList() {
        return this.http.get('/stats/rich-list').toPromise();
    }

    getRichValues(address) {
        return this.http.get('/v3/address/' + address);
    }
}
