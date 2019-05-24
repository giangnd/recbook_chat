import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { PageLoadingService } from '../services/page-loading.service';

@Injectable()
export class LoadingXhrProvider extends BrowserXhr {
    private requestCouter: number = 0;
    private isStart: boolean = false;
    constructor(private loadingService: PageLoadingService) { super() }

    public build() {
        const xhr = super.build();

        xhr.onloadstart = (e) => {
            this.requestCouter++;
            if (!this.isStart) {
                this.isStart = true;
                this.loadingService.start();
            }
        }

        xhr.onload = this.done.bind(this);
        xhr.onerror = this.done.bind(this);
        xhr.onabort = this.done.bind(this);

        return xhr;
    }

    private done(e) {
        this.requestCouter--;
        if (this.requestCouter <= 0) {
            this.isStart = false;
            this.loadingService.complete();
        }
    }
}