import { HistoryComponent } from './history/history.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { GroupComponent } from './group/group.component';
import { SelectivePreloadingStrategy } from '../core/strategies/preload.strategy';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'histories',
                pathMatch: 'full',
            },
            {
                path: 'histories',
                component: HistoryComponent,
            },
            {
                path: 'groups',
                component: GroupComponent,
            }
        ],
        data: {
            preload: true,
        }
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [SelectivePreloadingStrategy]
})
export class HomeRouting { }
