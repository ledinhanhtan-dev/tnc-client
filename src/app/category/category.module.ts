import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { SharedModule } from '@shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { components } from './components';

@NgModule({
  declarations: [...components, CategoryComponent],
  imports: [CommonModule, SharedModule, CategoryRoutingModule],
})
export class CategoryModule {}
