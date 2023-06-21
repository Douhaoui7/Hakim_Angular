import { Injectable } from "@angular/core";
import { IProduit } from "./produit";

@Injectable({
    providedIn: 'root'
})


export class ProduitService {
    //Recuperation de la liste des produit a partir du local storage
    public getProduit(): IProduit[] {

        let iProduit: IProduit[] = []
        let local = localStorage.getItem("saveProduit")

        if (!!local) {
            iProduit = JSON.parse(local)
            return iProduit;
        } else {
            return [
                {
                    nom:"Iphone 11",
                    code:"IP11",
                    qte:"120",
                    price:"19",
                    image:""
                }
            ]
        }
    }
}


