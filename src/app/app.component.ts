import { environment } from './../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<message-flash></message-flash><router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  appName: string = environment.appName;
  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(router.routerState, router.routerState.root).join('-');
        this.setTitle(title);
      }
    });
  }

  ngOnInit() { }

  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  setTitle(title) {
    this.titleService.setTitle(`${title ? `${title} - ` : ''}${this.appName}`);
  }
}
