import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroFormComponent } from './containers/livro-form/livro-form.component';

import { LivrosComponent } from './containers/livros/livros.componente';

const routes: Routes = [
  { path: '', component: LivrosComponent },
  { path: 'novo', component: LivroFormComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivrosRoutingModule { }
