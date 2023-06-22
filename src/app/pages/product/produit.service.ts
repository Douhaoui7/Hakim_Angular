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
                    price:"190",
                    image:"https://www.backmarket.be/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D640/https://d1eh9yux7w8iql.cloudfront.net/product_images/418120_98f32291-8c1e-452f-b0cb-2bcad0652b2f.jpg",
                }
            ]
        }
    }
}


