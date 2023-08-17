import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
 
import { Role, User } from '../../../models';
import { CreateCustomerUserForm, CreateServiceProviderUserForm } from '../../../forms';
import { LoginForm } from 'src/app/shared/forms/login.form';
import { TokenService } from '../../token/token.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL: string = this.apiService.getURLServer();
  private readonly API_SUFFIX: string = '/user';

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private poNotificationService: PoNotificationService,
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  public findAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}${this.API_SUFFIX}`);
  }

  public findUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}${this.API_SUFFIX}/${userId}`);
  }

  public createCustomerUser(form: CreateCustomerUserForm): Observable<User> {
    return this.httpClient.post<User>(`${this.API_URL}${this.API_SUFFIX}/customer/`, form);
  }

  public createServiceProviderUser(form: CreateServiceProviderUserForm): Observable<User> {
    return this.httpClient.post<User>(`${this.API_URL}${this.API_SUFFIX}/service-provider/`, form);
  }

  public async login(form: LoginForm): Promise<void> {
    // this.httpClient
    //   .post<EncodedToken>(`${this.API_URL}${this.API_SUFFIX}/login/`, form)
    //   .subscribe((encodedToken: EncodedToken) => this.tokenService.set(encodedToken.token));

    const payload = await this.tokenService.getPayload();

    if (payload && payload.role === Role.CUSTOMER)
      this.router.navigate(['/dashboard-customer']);
    else if (payload && payload.role === Role.SERVICE_PROVIDER)
      this.router.navigate(['/dashboard-service-provider']);
    else {
      this.tokenService.clear();
      this.logout('Ocorreu um erro ao efetuar o acesso a plataforma.');
    }
  }

  public async logout(optionalMessage?: string): Promise<void> {
    await this.tokenService.clear();
    const defaultMessage = 'O processo de log off será realizado, você será redirecionado para a página inicial em instantes...'
    this.poNotificationService.warning(optionalMessage || defaultMessage);
    setTimeout(() => this.router.navigate(['/']), 1500);
  }
}
