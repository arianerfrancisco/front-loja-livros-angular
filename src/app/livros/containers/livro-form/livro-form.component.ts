import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ILivro } from '../../model/livro.interface';

import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.scss'],
})
export class LivroFormComponent implements OnInit {
  form = this.formBuilder.group({
    nome: [''],
    autor: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    // NonNullableFormBuilder: garante a não inserção de valores nulos em quaisquer campos do formulario
    private service: LivrosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const livro: ILivro = this.route.snapshot.data['livro'];
    console.log(livro);
  }
  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSucess(),
      (error) => this.onError()
    );
  }
  onCancel() {
    this.location.back();
  }
  private onError() {
    {
      this.snackBar.open('Erro ao salvar livro!', '', { duration: 2000 });
    }
  }
  private onSucess() {
    {
      this.snackBar.open('Curso salvo com sucesso!', '', { duration: 2000 });
      this.onCancel();
    }
  }
}
