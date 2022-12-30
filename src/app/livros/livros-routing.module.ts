import { LivroResolver } from './guards/livro.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroFormComponent } from './containers/livro-form/livro-form.component';

import { LivrosComponent } from './containers/livros/livros.componente';

const routes: Routes = [
  { path: '', component: LivrosComponent },
  { path: 'novo', component: LivroFormComponent, resolve:{livro:LivroResolver}},
  { path: 'edit/:id', component: LivroFormComponent, resolve:{livro:LivroResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivrosRoutingModule {}
