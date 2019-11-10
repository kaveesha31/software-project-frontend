import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService, UserService} from '../_services';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  uid;
  currentUser;

  constructor(
    private route: ActivatedRoute,
    private auth: UserService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.uid = val.id;
      this.getUserById();
    });
  }

  getUserById() {
    this.auth.getUserById(this.uid).subscribe((val: any) => {
      this.currentUser = val.user;
      console.log(val);
    });
  }

}
