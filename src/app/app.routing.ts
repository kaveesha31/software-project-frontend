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
import {ReserveFormComponent} from './reserve-form/reserve-form.component';
import {ReservationEditFormComponent} from './reservation-edit-form/reservation-edit-form.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {UserListComponent} from './user-list/user-list.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {ViewVehicleComponent} from './view-vehicle/view-vehicle.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'vehicle-add', component: VehicleAddComponent, canActivate: [AuthGuard]},
  {path: 'vehicle-edit/:id', component: VehicleEditComponent, canActivate: [AuthGuard]},
  {path: 'vehicle-list', component: VehicleListComponent, canActivate: [AuthGuard]},
  {path: 'account-verification', component: AccountVerificationComponent},
  {path: 'user-profile-edit/:id', component: UserProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'reservation-form', component: ReserveFormComponent,},
  {path: 'reservation-edit-form/:id', component: ReservationEditFormComponent, canActivate: [AuthGuard]},
  {path: 'reservation-list', component: ReservationListComponent, canActivate: [AuthGuard]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard], data: {permittedRoles: ['admin']}},
  {path: 'user/:id', component: ViewProfileComponent, canActivate: [AuthGuard]},
  {path: 'vehicle/:id', component: ViewVehicleComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
