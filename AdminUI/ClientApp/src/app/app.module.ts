import { BrowserModule } from '@angular/platform-browser';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule
} from "@angular/material";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { UtilityService } from '../shared/utils/utility.service';
import { TelericServices } from '../services/teleric.service';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout/layout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SettingsModule } from './settings/settings.module';
import { MyFilter } from '../shared/pipes/myfilter';
import { GroupsFilter } from '../shared/pipes/groupsfilter';
import { AutofocusDirective } from '../shared/directives/auto-focus.directive';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TelerikReportComponent } from './telerik-report/telerik-report.component';
import { GridModule,PDFModule,ExcelModule} from '@progress/kendo-angular-grid';
import { RatingComponent } from './telerik-report/rating/rating.component';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { TelerikReportDBComponent } from './telerik-report/telerik-report-db/telerik-report-db.component';
import { FilteredDataComponent } from './telerik-report/filtered-data/filtered-data.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {ReactiveFormsModule } from '@angular/forms'
import { NgxNotificationComponent } from 'ngx-notification';


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent,
        HomeComponent,
        UsersComponent,
        MyFilter,   
        GroupsFilter,
        AutofocusDirective,  
        TelerikReportComponent,
        RatingComponent,
        TelerikReportDBComponent,
        FilteredDataComponent,
        NgxNotificationComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        NgbModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        LayoutModule,
        SettingsModule,
        InputsModule,
        GridModule,  
        PDFModule,
        ExcelModule,
        DropDownListModule,
        DialogModule,
        ButtonModule,
        ReactiveFormsModule

    ],
    exports: [MyFilter, GroupsFilter],
    providers: [
        AuthService,
        AuthGuard,
        CommonService,
        UtilityService,
        TelericServices
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
