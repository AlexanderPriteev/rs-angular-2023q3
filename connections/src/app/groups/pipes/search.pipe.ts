import { Pipe, PipeTransform } from '@angular/core';
import {IItem} from "../../redux/interfaces/items";

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: IItem[], text: string): IItem[] {
    if (!value.length || !text) return value;
    return value.filter((e) => e.item.name.S.toLowerCase().includes(text.toLowerCase()))
  }

}
