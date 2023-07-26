import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import {
  PoButtonModule,
  PoContainerModule,
  PoFieldModule,
  PoSlideModule,
} from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PoContainerModule,
    PoFieldModule,
    PoButtonModule,
    PoSlideModule,
    RouterModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
