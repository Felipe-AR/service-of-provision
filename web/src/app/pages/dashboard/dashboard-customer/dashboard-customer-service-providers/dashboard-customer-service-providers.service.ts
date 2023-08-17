import { Injectable } from '@angular/core';

import { PoPageDynamicTableFilters } from '@po-ui/ng-templates';

@Injectable({
  providedIn: 'root'
})
export class DashboardCustomerServiceProvidersService {
  public getFields(): PoPageDynamicTableFilters[] {
    return [
      { property: 'id', key: true, visible: false },
      { property: 'companyName', label: 'Empresa' },
      { property: 'cnpj', label: 'CNPJ' },
      { property: 'coreBusiness.name', label: 'Ramo de Atividade' },
    ]
  }
}
