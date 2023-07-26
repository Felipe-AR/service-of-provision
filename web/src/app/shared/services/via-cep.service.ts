import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Address } from '../models';
import { ViaCepAddress } from './via-cep.model';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private apiURL: string = 'https://viacep.com.br/ws';
  private dataFormat: "xml" | "json" = "json";

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAddressByZipCode(zipCode: string): Observable<Omit<Address, 'userId' | 'num'> | null> {
    return this.httpClient.get<ViaCepAddress>(`${this.apiURL}/${zipCode}/${this.dataFormat}`)
      .pipe(map(viaCepAddress => {
        if (!('erro' in viaCepAddress)) {
          return this.convertViaCepAddressToModel(viaCepAddress);
        }
        return null;
      }));
    }

  public convertViaCepAddressToModel(
    viaCepAddress: ViaCepAddress
  ): Omit<Address, 'userId' | 'num'> {
    return {
      street: viaCepAddress.logradouro,
      complement: viaCepAddress.complemento,
      district: viaCepAddress.bairro,
      city: viaCepAddress.localidade,
      state: viaCepAddress.uf,
      zipCode: viaCepAddress.cep
    }
  }
}
