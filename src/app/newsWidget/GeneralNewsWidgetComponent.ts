import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NewsFeedService} from './services/news-feed.service';
import {News} from './dataModels/News';
import * as _ from 'lodash';
import {Tag} from './dataModels/Tag';
import {BehaviorSubject, combineLatest, interval, Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-svandis-news',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './generalNewsWidget.html',
    styleUrls: ['./generalNewsWidget.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GeneralNewsWidgetComponent implements OnInit, OnDestroy {
    @Input() token: string;
    @Input() theme: 'light' | 'dark' = 'dark';

    public expandedNews = {};
    public readonly ICON_TAGS_CLASSES = [
        {
            title: 'Bullish',
            icon: 'arrow_upward'
        },
        {
            title: 'Bearish',
            icon: 'arrow_downward'
        },
        {
            title: 'Important',
            icon: 'warning'
        }
    ];
    private postsSubject: BehaviorSubject<News[]> = new BehaviorSubject([]);
    private currentPage = 1;
    private readonly PER_PAGE = 10;
    private readonly POLLING_INTERVAL = 10 * 1000;
    private intervalSubscription: Subscription;

    constructor(public newsFeedService: NewsFeedService) {
    }

    ngOnInit() {
        this.getNewsStream();
        this.intervalSubscription = interval(this.POLLING_INTERVAL)
            .subscribe(() => this.getNewsStream());
    }

    ngOnDestroy(): void {
        this.intervalSubscription.unsubscribe();
    }

    public getIcon(tags: Tag[]) {
        return _.intersectionBy(this.ICON_TAGS_CLASSES, tags, 'title')
            .map(v => _(v).get('icon'));
    }

    public getNewsStream(incrementPage = 0) {
        this.currentPage += incrementPage;
        combineLatest([
            this.postsSubject.pipe(take(1)),
            this.newsFeedService.fetchNewsPage(this.token, this.getPageParams())
        ])
            .subscribe(([old, res]) => {
                if (res && !_.isEqual(old, res)) {
                    this.postsSubject.next(_.concat(_.cloneDeep(old), (_.cloneDeep(res))));
                }
            });
    }

    public expand(newsId) {
        const newVal = !(_.get(this.expandedNews, newsId));
        _.set(this.expandedNews, newsId + '', newVal);
    }

    public getPostStream(): Observable<News[]> {
        return this.postsSubject.asObservable();
    }

    private getPageParams() {
        return {
            page: this.currentPage,
            perPage: this.PER_PAGE
        };
    }
}

