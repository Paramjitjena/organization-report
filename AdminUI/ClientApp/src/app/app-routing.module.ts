import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './Layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import {TelerikReportComponent} from './telerik-report/telerik-report.component'
import { TelerikReportDBComponent } from './telerik-report/telerik-report-db/telerik-report-db.component';
import { FilteredDataComponent } from './telerik-report/filtered-data/filtered-data.component';

const routes: Routes = [
    {path: '', redirectTo: 'reports', pathMatch: 'full'},
    {
        "path": "",
        "component": LayoutComponent,
         canActivate : [AuthGuard],
        "children": [
            {
                path: "reports",
                component:TelerikReportComponent
            },
            {
                path: "db-reports",
                component:TelerikReportDBComponent
            },
            {
                path: "filters",
                component:FilteredDataComponent
            },
            {
                path: "users",
                component:UsersComponent
            },
            {
                path: "settings",
                loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
            }
        ]
    },
    {
        "path": "login",
        "component": LoginComponent
    }
];

@NgModule({

  imports: [
      RouterModule.forRoot(routes)
     ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
