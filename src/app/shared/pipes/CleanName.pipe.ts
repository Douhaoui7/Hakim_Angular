import { Pipe, PipeTransform } from "@angular/core";

// Definition d'une pipe (CleanName) qui permet supprimer les carracteres speciaux
@Pipe({
    name:'CleanNamePipe'
})

export class CleanNamePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const specialChars = /[+=*#\/!|]/g;
      return value.replace(specialChars, '');
    }
    return '';
  }
}
