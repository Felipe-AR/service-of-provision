import { Injectable } from '@angular/core';

import { PoDynamicViewField } from '@po-ui/ng-components';
import { Gender } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardCustomerProfilesService {
  public getPersonalDataFields(): PoDynamicViewField[] {
    return [
      { property: 'name', label: 'Nome', gridColumns: 4 },
      { property: 'surname', label: 'Sobrenome', gridColumns: 4 },
      { property: 'user.email', label: 'E-mail', gridColumns: 4 },
      { property: 'rg', label: 'RG', gridColumns: 4 },
      { property: 'cpf', label: 'CPF', gridColumns: 4 },
      { property: 'user.phone', label: 'Telefone', gridColumns: 4 },
      { property: 'gender', label: 'Gênero', options: [
        { label: 'Masculino', value: Gender.MALE },
        { label: 'Feminino', value: Gender.FEMALE },
        { label: '', value: Gender.OTHER },
      ] },
    ]
  };
}
