import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'FiltreByTitleRessource'
})
export class FiltreByTitleRessource implements PipeTransform {
  transform(ressources: any[], searchTerm: string): any[] {
    if (!searchTerm || searchTerm === '') {
      return ressources;
    }

    return ressources.filter(ressource => {
      const title = ressource.title.toLowerCase();
      return title.includes(searchTerm.toLowerCase());
    });
  }
}
