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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PoContainerModule,
    PoFieldModule,
    PoButtonModule,
    PoSlideModule,
    FormsModule,
    RouterModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
