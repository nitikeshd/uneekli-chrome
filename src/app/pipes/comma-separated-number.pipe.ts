import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparatedNumber',
  standalone: true,
})
export class CommaSeparatedNumberPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!isNaN(value)) {
      // convert the value to a fixed 2 decimal places number
      value = parseFloat(value).toFixed(2);

      // split number by decimal point
      let [integer, decimal] = value.toString().split('.');

      // apply comma separators to the integer part
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      // join integer and decimal parts
      return decimal ? `${integer}.${decimal}` : integer;
    }
    return value;
  }
}
