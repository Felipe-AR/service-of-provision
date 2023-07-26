import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardServiceProviderComponent } from './dashboard-service-provider.component';

@NgModule({
  declarations: [DashboardServiceProviderComponent],
  imports: [CommonModule],
  exports: [DashboardServiceProviderComponent]
})
export class DashboardServiceProviderModule {}
