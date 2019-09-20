import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

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

  constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
       return this.http.post<ResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDh3tai3zDKbQXivYn2BpToPaReCamW8-w',
          {
            email,
            password,
            returnSecureToken: true
          }
       ).pipe(catchError(this.handeError));
    }
    login(email: string, password: string) {
      // tslint:disable-next-line:max-line-length
    return this.http.post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDh3tai3zDKbQXivYn2BpToPaReCamW8-w',
        {
          email,
          password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handeError));
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
