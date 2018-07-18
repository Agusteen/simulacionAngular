import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setNoValue'
})
export class SetNoValuePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == -1){
      return 'x';
    } else {
      return value;
    }
  }

}
