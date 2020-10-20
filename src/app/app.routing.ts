import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {VehicleAddComponent} from './vehicle-add/vehicle-add.component';
import {VehicleListComponent} from './vehicle-list/vehicle-list.component';
import {VehicleEditComponent} from './vehicle-edit/vehicle-edit.component';
import {UserProfileEditComponent} from './user-profile-edit/user-profile-edit.component';
import {ReservationEditFormComponent} from './reservation-edit-form/reservation-edit-form.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {UserListComponent} from './user-list/user-list.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {ViewVehicleComponent} from './view-vehicle/view-vehicle.component';
import { HomeNewComponent } from './home-new/home-new.component';
import { LoginNewComponent } from './login-new/login-new.component';
import { PaymentComponent } from './payment/payment.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'vehicle-add', component: VehicleAddComponent, canActivate: [AuthGuard] },
  {path: 'vehicle-edit/:id', component: VehicleEditComponent, canActivate: [AuthGuard] },
  {path: 'vehicle-list', component: VehicleListComponent, canActivate: [AuthGuard] },
  {path: 'account-verification', component: AccountVerificationComponent},
  {path: 'user-profile-edit/:id', component: UserProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'reservation-edit-form/:id', component: ReservationEditFormComponent, canActivate: [AuthGuard] },
  {path: 'reservation-list', component: ReservationListComponent, canActivate: [AuthGuard]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  {path: 'user/:id', component: ViewProfileComponent, },
  {path: 'vehicle/:id', component: ViewVehicleComponent, },
  {path: 'login-new', component: LoginNewComponent },
  {path: 'payment', component: PaymentComponent },
  {path: 'reset-password', component: PasswordResetComponent },
  {path: '', component: LandingPageComponent },
  {path: 'feedback-list', component: FeedbackListComponent },

  // {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot(appRoutes);
