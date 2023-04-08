import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(products: any[], searchTerm: string): any[] {
    if (!searchTerm || searchTerm === '') {
      return products;
    }

    return products.filter(product => {
      const name = product.name.toLowerCase();
      return name.includes(searchTerm.toLowerCase());
    });
  }
}
