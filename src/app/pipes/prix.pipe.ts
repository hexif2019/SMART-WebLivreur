import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix'
})
export class PrixPipe implements PipeTransform {

  transform(value: number, separator ?: string): string {
    let e = Math.trunc(value/100);
    let c = value - 100*e;
    return e + (separator || ',') + (c<10 ? '0': '') + c ;
  }

}
