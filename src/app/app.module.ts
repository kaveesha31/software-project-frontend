import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from '../app/_components/alert';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from './_guards/auth.guard';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReserveFormComponent } from './reserve-form/reserve-form.component';
import { ReservationEditFormComponent } from './reservation-edit-form/reservation-edit-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        MatFormFieldModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserProfileComponent,
        VehicleAddComponent,
        VehicleListComponent,
        VehicleEditComponent,
        AccountVerificationComponent,
        UserProfileEditComponent,
        ReserveFormComponent,
        ReservationEditFormComponent,
        ReservationListComponent,
        UserListComponent,
        ViewProfileComponent,
        ViewVehicleComponent,
    ],
    providers: [AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }