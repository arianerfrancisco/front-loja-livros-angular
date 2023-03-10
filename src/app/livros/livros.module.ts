import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LivroFormComponent } from './containers/livro-form/livro-form.component';
import { LivrosRoutingModule } from './livros-routing.module';
import { LivrosComponent } from './containers/livros/livros.componente';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { SharedModule } from './shared/shared.module';
import { LivrosListComponent } from './components/livros-list/livros-list.component';

@NgModule({
  declarations: [LivrosComponent, LivroFormComponent, LivrosListComponent],
  imports: [
    CommonModule,
    LivrosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class LivrosModule {}
