import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { PageLoadingService } from '../services/page-loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styles: [
    '.loading-bar-top{position:fixed;top:0;left:0;right:0;z-index:99999;}',
    '.loading-bar{display:block;transition: all .2s ease;}'
  ]
})
export class PageLoadingComponent implements OnInit, OnDestroy {
  @Input() progress: number = 0;
  @Input() color: string = '#03a9f4';
  @Input() size: number = 4;
  showLoading: boolean = false;
  intervalId: any;
  eventSub: Subscription;

  constructor(
    private loadingService: PageLoadingService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.eventSub = this.loadingService.eventLoading.subscribe(e => {
      if (e && !this.loadingService.isIgnoreLoadingBar()) {
        this[e]();
      } else {
        this.loadingService.setLoadingBar();
      }
      this._cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

  private start(): void {
    this.stop();
    this.showLoading = true;
    this.intervalId = setInterval(() => {
      if (this.progress > 80) {
        this.progress += 1;
      } else {
        this.progress += 10;
      }
      if (this.progress === 100) {
        this.complete();
      }
    }, 200);
  }

  private stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private complete(): void {
    this.progress = 100;
    this.stop();
    setTimeout(() => {
      this.showLoading = false;
      this.progress = 0;
    }, 250);
  }
}