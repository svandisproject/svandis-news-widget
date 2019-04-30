import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
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

    public fetchNewsPage(token): Observable<News[]> {
        if (!token) {
            return EMPTY;
        }
        const params = {
            page: (++this.page).toString(),
            perPage: (this.PER_PAGE).toString()
        };
        return this.httpClient.get(this.URL + '/' + token, { params})
            .pipe(
                map((res: { data: News[] }) => res.data),
                map((news) => _.map(news, n => {
                    n.content = _.truncate(n.content, {length: 200, separator: '.'});
                    return n;
                }))
            );
    }


}
