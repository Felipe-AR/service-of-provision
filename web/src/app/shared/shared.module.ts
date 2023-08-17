import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViaCepService } from './services/via-cep/via-cep.service';
import {
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoModalModule,
  PoCheckboxModule,
  PoCheckboxGroupModule,
  PoButtonModule,
} from '@po-ui/ng-components';
import { SamplePoMenuHumanResourcesComponent } from './components/samples/sample-po-menu-human-resources/sample-po-menu-human-resources.component';
import { SamplePoMenuHumanResourcesService } from './components/samples/sample-po-menu-human-resources/sample-po-menu-human-resources.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SamplePoMenuHumanResourcesComponent],
  imports: [
    CommonModule,
    PoMenuModule,
    PoPageModule,
    PoToolbarModule,
    PoModalModule,
    PoCheckboxModule,
    PoCheckboxGroupModule,
    PoButtonModule,
    FormsModule,
    RouterModule,
  ],
  providers: [ViaCepService, SamplePoMenuHumanResourcesService],
  exports: [SamplePoMenuHumanResourcesComponent],
})
export class SharedModule {}
