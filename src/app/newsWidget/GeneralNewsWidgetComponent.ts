import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NewsFeedService} from './services/news-feed.service';
import {of, Observable} from 'rxjs';
import {News} from './dataModels/News';
@Component({
    selector: 'app-svandis-news',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './generalNewsWidget.html',
    styleUrls: ['./generalNewsWidget.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class GeneralNewsWidgetComponent implements OnInit {
    @Input() filters: string;
    public postsStream: Observable<News[]> = of([]);
    public expandedNews = {};
    constructor(public newsFeedService: NewsFeedService) {
    }

    ngOnInit() {
        // TODO: ONLY ON DEVELOP
        this.filters = '53633879-02a0-4e8a-a93f-66c85c69cfb8';
        this.getNewsStream();
    }

    public getNewsStream() {
        this.postsStream = this.newsFeedService.getAll(this.filters);
    }

    public getAnimationTrigger(newsId) {
        return this.expandedNews && this.expandedNews[newsId] ? 'in' : 'out';
    }

    public expand(newsId) {
        console.log('click');
        this.expandedNews[newsId] = !this.expandedNews[newsId];
    }
}
