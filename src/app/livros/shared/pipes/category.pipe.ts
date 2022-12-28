import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'autor 1':
        return 'group';
      case 'autor 3':
        return 'person';
    }

    return 'code';
  }
}
