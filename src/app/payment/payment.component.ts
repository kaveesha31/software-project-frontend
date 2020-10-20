import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  fq: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fq = this.fb.group({
      val : ['']
    });
  }

  showAlert(){
    alert('Reserved');
  }

}
