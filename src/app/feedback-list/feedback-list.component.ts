import { Component, OnInit } from '@angular/core';
import { Feedback } from '../_models/feedback';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  feedbacks : Feedback[];

  constructor(
    private UserService : UserService
  ) { }

  ngOnInit() {
    this.UserService.displayFeedback().subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }

  deletefeedback(id) {
    this.UserService.deletefeedback(id).subscribe(res => {
      const index = this.feedbacks.findIndex(x => x['id'] === id);
      this.feedbacks.splice(index,1);
      console.log('Deleted');
    });
  }

}
