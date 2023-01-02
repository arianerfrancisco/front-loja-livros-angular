import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ILivro } from '../../model/livro.interface';
import { LivrosService } from '../../services/livros.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss'],
})
export class LivrosComponent {
  livros$: Observable<ILivro[]> | null = null;

  displayedColumns = ['nome', 'autor', 'actions'];

  constructor(
    public dialog: MatDialog,
    private livrosService: LivrosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }
  refresh() {
    this.livros$ = this.livrosService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar livros');
        return of([]);
      })
    );
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
  onAdd() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onEdit(livro: ILivro) {
    this.router.navigate(['edit', livro._id], { relativeTo: this.route });
  }

  onDelete(livro: ILivro) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir o curso?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.livrosService.remove(livro._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Livro deletado com sucesso!', 'X', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar remover curso')
        );
      }
    });
  }
}
