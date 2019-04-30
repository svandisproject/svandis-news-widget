import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {GeneralNewsWidgetComponent} from './newsWidget/GeneralNewsWidgetComponent';
import {NewsFeedService} from './newsWidget/services/news-feed.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {DomainPipe} from './newsWidget/pipes/domain.pipe';

@NgModule({
    declarations: [
        GeneralNewsWidgetComponent,
        DomainPipe
    ],
    entryComponents: [
        GeneralNewsWidgetComponent
    ],
    exports: [
        GeneralNewsWidgetComponent,
        DomainPipe
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
        const el: any = createCustomElement(GeneralNewsWidgetComponent, {injector});
        customElements.define('svandis-news', el);
    }

    ngDoBootstrap() {
    }
}
