import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {UserModel} from './user.model';

export interface ResponseData {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<UserModel>(null);
  tokenExpirationTime: any;

  constructor(private http: HttpClient) {}

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiryDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadUser = new UserModel(userData.email, userData._token, userData.id, new Date(userData._tokenExpiryDate));
    if (loadUser.token) {
      this.user.next(loadUser);
      const expirationDuration =
        new Date(userData._tokenExpiryDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }
  autoLogout(expirationtime: number) {
    this.tokenExpirationTime = setTimeout(() => {
        this.logout();
      } ,
      expirationtime);
  }

  signup(email: string, password: string) {
    return this.http.post<ResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDh3tai3zDKbQXivYn2BpToPaReCamW8-w',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handeError), tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.idToken,
        resData.localId,
        +resData.expiresIn
      );
    }));
  }
  login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDh3tai3zDKbQXivYn2BpToPaReCamW8-w',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handeError),  tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.idToken,
          resData.localId,
          +resData.expiresIn
        );
      })
    );
  }

  private handleAuthentication(email: string, idToken: string, localId: string , expireID: number) {
    const expirationDate = new Date(new Date().getTime() + expireID * 1000);
    const user = new UserModel(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expireID * 1000);
    localStorage.setItem('serData', JSON.stringify(user));
  }

  private handeError(errorRes: HttpErrorResponse) {
    let errorMessage =  'An unknown msg has occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email does not exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'entered password in invalid';
    }
    return throwError(errorMessage);
  }
}
