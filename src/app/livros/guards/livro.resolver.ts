import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ILivro } from '../model/livro.interface';
import { LivrosService } from '../services/livros.service';

@Injectable({
  providedIn: 'root',
})
export class LivroResolver implements Resolve<ILivro> {
  constructor(private service: LivrosService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ILivro> {
    if (route.params && route.params['id']) {
      this.service.loadById(route.params['id']);
    }
    return of({ _id: '', nome: '', autor: '' });
  }
}
