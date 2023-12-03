import { Pipe, PipeTransform } from '@angular/core';
import { Cell } from '../model/huezz.model';

@Pipe({
  name: 'toRgba',
  standalone: true,
})
export class ToRgbaPipe implements PipeTransform {
  public transform(cell: Cell): string {
    return `rgba(${cell.r}, ${cell.g}, ${cell.b}, 1)`;
  }
}
