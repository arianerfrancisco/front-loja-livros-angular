import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Romance':
        return 'favorite';
      case 'Suspense':
        return 'search off';
      case 'Drama':
        return 'sentiment_dissatisfied';
    }

    return 'check small';
  }
}
