import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {
  verify: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
     this.verify = this.formBuilder.group({
       randomCode: ['', Validators.required],
   });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

      // convenience getter for easy access to form fields
       get f() { return this.verify.controls; }

       onSubmit() {
         this.submitted = true;

         // stop here if form is invalid
         if (this.verify.invalid) {
             return;
         }

        this.loading = true;
        this.authenticationService.verifyAccount(this.f.randomCode.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.router.navigate(['/login-new']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
