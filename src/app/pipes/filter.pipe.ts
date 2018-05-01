import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string) {
    return !searchText ? items : items.filter(
      item => JSON.stringify(item).toLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }

}
