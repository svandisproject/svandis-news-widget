import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {NewsWidgetComponent} from './newsWidget/NewsWidgetComponent';
import {NewsFeedService} from './newsWidget/services/news-feed.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        NewsWidgetComponent
    ],
    entryComponents: [
        NewsWidgetComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserModule
    ],
    providers: [
        NewsFeedService
    ]
})
export class AppModule {
    constructor(private injector: Injector) {
        const el: any = createCustomElement(NewsWidgetComponent, {injector});
        customElements.define('svandis-news', el);
    }

    ngDoBootstrap() {
    }
}
