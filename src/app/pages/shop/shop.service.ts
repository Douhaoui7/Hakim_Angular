import { Injectable } from "@angular/core";
import { IShop } from "./shop";


@Injectable({
    providedIn: 'root'
})
export class ShopService {
    //Recuperation de la liste des boutiques a partir du local storage
    public getShop(): IShop[] {

        let iShop: IShop[] = []
        let local = localStorage.getItem("saveShop")

        if (!!local) {
            iShop = JSON.parse(local)
            return iShop;
        } else {
            return [
                {
                    nom:"Apple store",
                    adresse:"Californie"
                }
            ]
        }
    }
}
