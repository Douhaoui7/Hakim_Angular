import { Pipe, PipeTransform } from "@angular/core";

// Definition d'une pipe (CleanName) qui permet supprimer les carracteres speciaux
@Pipe({
    name:'CleanName'
})

export class CleanName implements PipeTransform {

    transform(value: string) : string{
        if(!!value){
           return value.replace("*" , "").replace("#" , "").replace("/" , "").replace("!" , "");
        }else{
            return ''
        }
    }

}