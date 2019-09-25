import {Component, ComponentFactoryResolver} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, ResponseData} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
 templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLogedIn = true;
  isLoading =  false;
  error: string = null;
  constructor(private authService: AuthService,
              private router: Router,
              private ComponentFactory: ComponentFactoryResolver) {}

  onSwitched() {
    this.isLogedIn = !this.isLogedIn;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<ResponseData>;

    this.isLoading = true;
    if (this.isLogedIn) {
    authObs = this.authService.login(email, password);
  } else {
    authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);

      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });

    form.reset();
  }
  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    this.ComponentFactory.resolveComponentFactory(
      AlertComponent
    );

  }

}
