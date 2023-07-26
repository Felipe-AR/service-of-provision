import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PoNotificationService, PoInputComponent } from '@po-ui/ng-components';
import { lastValueFrom } from 'rxjs';
import { CreateCustomerUserForm } from 'src/app/shared/forms/create-customer-user.form';
import { Address } from 'src/app/shared/models';
import { GENDER_OPTIONS } from 'src/app/shared/models/enums/gender.enum';
import { ViaCepService } from 'src/app/shared/services/via-cep.service';

@Component({
  selector: 'app-register-service-provider',
  templateUrl: './register-service-provider.component.html',
  styleUrls: ['./register-service-provider.component.css']
})
export class RegisterServiceProviderComponent {
  public createCustomerUserForm = new CreateCustomerUserForm();
  public customerAddress: Omit<Address, 'userId'> = new Address();
  public isZipCodeConsulted: boolean = false;
  public genderOptions = GENDER_OPTIONS;

  constructor(
    private viaCepService: ViaCepService,
    private httpClient: HttpClient,
    private poNotificationService: PoNotificationService,
    private router: Router
  ) {}

  public async createCustomer(customerForm: NgForm) {
    if (customerForm.form.valid) {
      this.httpClient
      .post('http://localhost:3000/user/customer', {
        ...this.createCustomerUserForm,
        addresses: [{ ...this.customerAddress }],
      })
      .subscribe({
        next: () => {
          this.poNotificationService.success(
            'O usuário foi criado com sucesso! Estamos redirecionando para a tela inicial.'
          ),
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1500);
        },
        error: (error) => console.log(error.error.message),
      });
    }
  }

  public async findAddressByZipCode(
    poInputComponent: PoInputComponent,
    address: Omit<Address, 'userId'>
  ) {
    const zipCode = poInputComponent.modelLastUpdate;
    const regexValidateZipCode = new RegExp('[0-9]{5}[0-9]{3}');
    let isZipCodeValid: boolean = true;

    if (regexValidateZipCode.test(zipCode)) {
      const addressObservable$ =
        this.viaCepService.findAddressByZipCode(zipCode);
      const viaCepAddress = await lastValueFrom(addressObservable$);

      if (viaCepAddress) {
        address.street = viaCepAddress.street;
        address.state = viaCepAddress.state;
        address.district = viaCepAddress.district;
        address.city = viaCepAddress.city;
        address.zipCode = viaCepAddress.zipCode;
        this.isZipCodeConsulted = true;
      } else {
        isZipCodeValid = false;
      }
    }

    if (!isZipCodeValid) {
      address = new Address();
      this.isZipCodeConsulted = false;
    }
  }
}
