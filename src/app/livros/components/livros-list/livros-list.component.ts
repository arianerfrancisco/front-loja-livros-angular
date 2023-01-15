import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILivro } from '../../model/livro.interface';

@Component({
  selector: 'app-livros-list',
  templateUrl: './livros-list.component.html',
  styleUrls: ['./livros-list.component.scss'],
})
export class LivrosListComponent implements OnInit {
  @Input() livros: ILivro[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  // input: dados serão recebidos do componente pai
  // Isso foi garantido ao inserir
  // <app-livros-list *ngIf="livros$ | async as livros; else loading"
  // [livros]="livros" (add)="onAdd()"  (edit)="onEdit($event)" ></app-livros-list> no componente pai

  readonly displayedColumns = ['nome', 'autor', 'genero','actions'];

  constructor() {}

  ngOnInit(): void {}
  onAdd() {
    this.add.emit(true);
  }
  onEdit(livro: ILivro) {
    this.edit.emit(livro);
  }
  onDelete(livro: ILivro) {
    this.remove.emit(livro);
  }
}
