import {
    ChangeDetectionStrategy, Component, Input, OnInit,
    ViewEncapsulation
} from '@angular/core';
import {NewsFeedService} from './services/news-feed.service';
import {News} from './dataModels/News';
import * as _ from 'lodash';
import {Tag} from './dataModels/Tag';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';
@Component({
    selector: 'app-svandis-news',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './generalNewsWidget.html',
    styleUrls: ['./generalNewsWidget.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GeneralNewsWidgetComponent implements OnInit {
    @Input() token: string;
    public postsSubject: BehaviorSubject<News[]> = new BehaviorSubject([]);
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
    constructor(public newsFeedService: NewsFeedService) {
    }

    ngOnInit() {
        this.getNewsStream();
    }

    public getIcon(tags: Tag[]) {
        return _.intersectionBy(this.ICON_TAGS_CLASSES, tags, 'title')
            .map(v => _(v).get('icon'));
    }

    public getNewsStream() {
        combineLatest(this.postsSubject.pipe(take(1)), this.newsFeedService.fetchNewsPage(this.token))
            .subscribe(([old, res]) => {
                if (res) {
                    this.postsSubject.next( _.concat(_.cloneDeep(old), (_.cloneDeep(res))) );
                }
        });
    }

    public expand(newsId) {
        const newVal = !(_.get(this.expandedNews, newsId));
        _.set(this.expandedNews, newsId + '', newVal);
    }

}

