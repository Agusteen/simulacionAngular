import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setBooleans'
})
export class SetBooleansPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      return 'Si'
    } else {
      return 'No'
    }
  }

}
