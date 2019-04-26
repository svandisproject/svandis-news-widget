import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit,
    ViewEncapsulation
} from '@angular/core';
import {NewsFeedService} from './services/news-feed.service';
import {News} from './dataModels/News';
import * as _ from 'lodash';
import {Tag} from './dataModels/Tag';
@Component({
    selector: 'app-svandis-news',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './generalNewsWidget.html',
    styleUrls: ['./generalNewsWidget.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GeneralNewsWidgetComponent implements OnInit {
    @Input() filters: string;
    public posts: News[] = [];
    public expandedNews = {};
    public readonly ICON_TAGS_CLASSES = {
        Bullish: 'arrow_upward',
        Bearish: 'arrow_downward',
        Important: 'warning'
    };
    constructor(public newsFeedService: NewsFeedService,
                public ref: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        // TODO: ONLY ON DEVELOP
        this.filters = '53633879-02a0-4e8a-a93f-66c85c69cfb8';
        this.getNewsStream();
    }

    public getIcon(tags: Tag[]) {
        const icoTags = _(this.ICON_TAGS_CLASSES).keys().value();
        for (let i = 0; i < tags.length; ++i) {
            const title = _(tags[i]).get('title');
            if ( _(icoTags).indexOf(title) > -1 ) {
                return this.ICON_TAGS_CLASSES[title];
            }
        }
        return '';
    }

    public getNewsStream() {
        this.newsFeedService.getPage(this.filters).subscribe(v => {
            this.posts = _([]).concat(this.posts, v).value();
            this.ref.detectChanges();
        });
    }

    public expand(newsId) {
        const newVal = !(_.get(this.expandedNews, newsId));
        _.set(this.expandedNews, newsId + '', newVal);
    }

}

