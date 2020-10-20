import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService, ReservationService, UserService } from '../_services';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  edit = false;
  // angForm: FormGroup;
  currentUser;
  reservations: any[];
  oldReservations: any[];
  submitted: boolean;
  preview;
  angForm = this.fb.group({
    file: [null]
  })

  constructor(
    private userService: UserService,
    private router: RouterModule,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private cd: ChangeDetectorRef,
    private auth: AuthenticationService) {
  }

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://images-na.ssl-images-amazon.com/images/I/41yVjFHEE2L.jpg';
  editFile = true;
  removeUpload = false;

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.currentUser = res.user;
        console.log(this.currentUser);
        this.angForm = this.fb.group({
          userName: [this.currentUser.username],
          firstName: [this.currentUser.firstName, Validators.required],
          lastName: [this.currentUser.lastName, Validators.required],
          city: [this.currentUser.city, Validators.required],
          contactNumber: [this.currentUser.contactNumber, Validators.required],
          userImage: [null, Validators.required],
        });
        this.getReservations();
        this.getOldReservations();
      },
      err => {
        console.log(err);
      }
    );
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  updateUserProfile() {
    this.userService.updateUserProfile(this.angForm.value).subscribe(val => {
      alert('updated');
      console.log(val);
      this.currentUser = val;
      this.toggleEdit();
    });
  }

  getReservations() {
    this.reservationService.getByUser(this.auth.getCurrentUserId()).subscribe((val: any[]) => {
      console.log(val);
      this.reservations = val;
    });
  }

  getOldReservations() {
    this.reservationService.getOldByUser(this.auth.getCurrentUserId()).subscribe((val: any[]) => {
      console.log(val);
      this.oldReservations = val;
    });
  }

  addRating(reservation) {
    console.log(reservation);
    this.reservationService.addRating(reservation).subscribe(val=>{
      console.log(val);
    });
  }

  deleteReservation(id) {
    this.reservationService.deleteReservation(id).subscribe(res => {
      const index = this.reservations.findIndex(x => x['_id'] === id);
      console.log(index);
      this.reservations.splice(index, 1);
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // this.angForm.patchValue({
    //   userImage: file
    // });
    // this.angForm.get('userImage').updateValueAndValidity()

    const formData = new FormData();
    formData.append('image',file);

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)

    console.log('upload started')
    this.userService.updateImage(formData).subscribe(val=>{
      console.log(val);
      alert('updated')
    });
  }

  // Submit Registration Form
  onSubmit() {
    this.submitted = true;
    if (!this.angForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.angForm.value)
    }
  }
  
}
