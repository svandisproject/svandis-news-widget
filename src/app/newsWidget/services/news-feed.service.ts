import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SvandisNewsApiConfig} from '../config/SvandisNewsApiConfig';
import {News} from '../dataModels/News';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class NewsFeedService {
    private page = 0;
    private readonly PER_PAGE = 10;
    private readonly URL = SvandisNewsApiConfig.API_HOST + '/news';

    constructor(private httpClient: HttpClient) {
    }

    private objectToQs(obj: object) {
        if (!_.isObject(obj)) {
            return '';
        }
        const res = [];
        _(obj).keys().forEach((key) => {
            res.push(key + '=' + encodeURIComponent( _(obj).get(key) ));
        });

        return _(res).join('&');
    }

    private getRequestUrl(url: string, parameters: object) {
        return `${url}?${this.objectToQs(parameters)}`;
    }

    public getPage(token): Observable<News[]> {
        if (!token) {
            return of([]);
        }
        const parameters = {
            page: ++this.page,
            perPage: this.PER_PAGE
        };
        const url = this.getRequestUrl(this.URL + '/' + token, parameters);
        return this.httpClient.get(url)
            .pipe(
                map((res: { data: News[] }) => res.data)
            );
    }
}
