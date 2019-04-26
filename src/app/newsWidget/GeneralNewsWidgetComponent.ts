import {
    ChangeDetectionStrategy, Component, Input, OnInit,
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
    constructor(public newsFeedService: NewsFeedService) {
    }

    ngOnInit() {
        this.getNewsStream();
    }

    public getIcon(tags: Tag[]) {
        const icoTags = _(this.ICON_TAGS_CLASSES).keys().value();
        for (const tag of tags) {
            const title = _(tag).get('title');
            if ( _(icoTags).indexOf(title) > -1 ) {
                return this.ICON_TAGS_CLASSES[title];
            }
        }
        return '';
    }

    public getNewsStream() {
        this.newsFeedService.getPage(this.filters).subscribe(v => {
            this.posts = _([]).concat(this.posts, v).value();
        });
    }

    public expand(newsId) {
        const newVal = !(_.get(this.expandedNews, newsId));
        _.set(this.expandedNews, newsId + '', newVal);
    }

}

