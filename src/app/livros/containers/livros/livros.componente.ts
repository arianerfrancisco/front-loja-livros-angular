import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ILivro } from '../../model/livro.interface';
import { LivrosService } from '../../services/livros.service';
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
    private route: ActivatedRoute
  ) {
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
}
