import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NewsFeedService} from './services/news-feed.service';

@Component({
    selector: 'app-svandis-news',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'newsWidget.html',
    styleUrls: ['newsWidget.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})

export class NewsWidgetComponent implements OnInit {
    public posts;

    constructor(private newsFeedService: NewsFeedService) {
    }

    ngOnInit() {
        this.posts = this.newsFeedService.getAll();
    }
}
