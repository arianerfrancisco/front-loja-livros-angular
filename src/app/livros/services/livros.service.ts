import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

import { ILivro } from '../model/livro.interface';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly API = 'api/livros';

  constructor(private httpClient: HttpClient) {}

  public list() {
    return this.httpClient.get<ILivro[]>(this.API).pipe(
      first(), // obtém os dados na 1ª resposta e logo após a conexão é encerrada.
      delay(500)
      //tap((livros) => console.log(livros))
    );
  }

  loadById(id: string) {
    return this.httpClient.get<ILivro>(`${this.API}/${id}`);
  }

  save(record: Partial<ILivro>) {
    console.log(record);
    if (record._id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<ILivro>) {
    return this.httpClient.post<ILivro>(this.API, record).pipe(first());
  }

  private update(record: Partial<ILivro>) {
    return this.httpClient
      .put<ILivro>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
