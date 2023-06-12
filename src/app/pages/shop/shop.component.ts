import { Component, OnInit } from '@angular/core';
import {  Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { IShop } from './shop';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  // Declaration de l'objet Shop
  public shop:IShop[] = []

    // Construction de l'objet Shop
  constructor(private fb: FormBuilder,private shopService : ShopService ) { }

    // Validation du formulaire et serialisation-deserialisation 
  contactForm = this.fb.group({
    nom: ['',[Validators.minLength(3), Validators.required]],
    adresse: ['',[Validators.minLength(3), Validators.required]],
  });

    //Recuperation de la liste des boutiques (shop) a partir du local storage
  ngOnInit(): void {
    this.shop = this.shopService.getShop()
  }

      //Enregistrement de l'objet shop
  onSubmit() {
    if (!!localStorage.getItem("saveShop")) {

      let iShop: IShop[] = []
      let local = localStorage.getItem("saveShop")
      if (!!local)
        iShop = JSON.parse(local)

      iShop.push(this.contactForm.value)
      localStorage.setItem("saveShop", JSON.stringify(iShop))

    } else {
      let save: IShop[] = []
      save.push(this.contactForm.value)
      localStorage.setItem("saveShop", JSON.stringify(save))
    }

    this.shop = this.shopService.getShop()
  }

}
