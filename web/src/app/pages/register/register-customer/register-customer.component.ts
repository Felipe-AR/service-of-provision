import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PoInputComponent, PoNotificationService } from '@po-ui/ng-components';
import { lastValueFrom } from 'rxjs';
import { AddressForm } from 'src/app/shared/forms';

import { CreateCustomerUserForm } from 'src/app/shared/forms/create-customer-user.form';
import { Address } from 'src/app/shared/models';
import {
  GENDER_OPTIONS,
  Gender,
} from 'src/app/shared/models/enums/gender.enum';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { ViaCepService } from 'src/app/shared/services/via-cep/via-cep.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css'],
})
export class RegisterCustomerComponent {
  public createCustomerUserForm = new CreateCustomerUserForm();
  public customerAddress: Omit<AddressForm, 'userId'> = new AddressForm();
  public isZipCodeConsulted: boolean = false;
  public genderOptions = GENDER_OPTIONS;

  constructor(
    private viaCepService: ViaCepService,
    private httpClient: HttpClient,
    private userService: UserService,
    private poNotificationService: PoNotificationService,
    private router: Router
  ) {}

  public async createCustomer(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.userService.createCustomerUser({ 
        ...this.createCustomerUserForm, 
        address: this.customerAddress 
      }).subscribe({
        next: () => {
          this.poNotificationService.success('O usuário foi criado com sucesso! Estamos redirecionando para a tela inicial.'),
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: (httpErrorResponse: HttpErrorResponse) => this.poNotificationService.error(httpErrorResponse.message),
      });
    }
  }

  public async findAddressByZipCode(zipCode: string) {
    const regexValidateZipCode = new RegExp('[0-9]{5}[0-9]{3}');
    let isZipCodeValid: boolean = true;

    if (regexValidateZipCode.test(zipCode)) {
      const addressObservable$ =
        this.viaCepService.findAddressByZipCode(zipCode);
      const viaCepAddress = await lastValueFrom(addressObservable$);

      if (viaCepAddress) {
        this.customerAddress.street = viaCepAddress.street;
        this.customerAddress.state = viaCepAddress.state;
        this.customerAddress.district = viaCepAddress.district;
        this.customerAddress.city = viaCepAddress.city;
        this.customerAddress.zipCode = viaCepAddress.zipCode;
        this.isZipCodeConsulted = true;
      } else {
        isZipCodeValid = false;
      }
    }

    if (!isZipCodeValid) {
      this.customerAddress = new Address();
      this.isZipCodeConsulted = false;
    }
  }
}
