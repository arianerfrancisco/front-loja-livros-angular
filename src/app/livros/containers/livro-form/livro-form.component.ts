import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    _id: [''],
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    autor: ['', [Validators.required]],
    genero: [''],
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
    this.form.setValue({
      _id: livro._id,
      nome: livro.nome,
      autor: livro.autor,
      genero: livro.genero,
    });
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
      this.snackBar.open('Livro salvo com sucesso!', '', { duration: 2000 });
      this.onCancel();
    }
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }
}
