import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[];

  constructor(    
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.UserService.displayUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  deleteUser(id) {
    this.UserService.deleteUser(id).subscribe(res => {
      const index = this.users.findIndex(x => x['id'] === id);
      this.users.splice(index,1);
      console.log('Deleted');
    });
  }

}
