import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { decodeQuery } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  form: FormGroup;
  emailForm: FormGroup;
  code;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      code: ['', Validators.required]
    });

    this.emailForm = this.fb.group({
      email: ['', Validators.required]
    });

    this.route.queryParams.subscribe(val => {
      if (val.code) {
        let cd = val.code;
        console.log(cd);
        this.form.get('code').setValue(cd);
        this.code = cd;
      }
    });
  }

  resetPassword() {
    if (!this.form.valid) {
      console.log(this.form.value)
      alert('invalid data')
      return;
    }

    if (this.form.get('password').value !== this.form.get('confirmPassword').value) {
      alert('password mismatch');
      return;
    }

    console.log('sedin');
    this.userService.resetPassword(this.form.value).subscribe(val => {
      console.log(val);
      alert('Reset success');
      this.router.navigate(['/login-new']);
    }, (err) => {
      alert('error occured')
    });
  }

  getEmail() {
    if (!this.emailForm.valid) {
      return;
    }

    this.userService.getEmail(this.emailForm.value).subscribe(val => {
      console.log(val);
      alert('check emails');
      this.router.navigate(['/login-new']);
    });
  }

}
