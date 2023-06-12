import { Component, OnInit } from '@angular/core';
import {  Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { ProduitService } from './produit.service';
import { IProduit } from './produit';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // Declaration de l'objet produit
  public produit : IProduit[] = []

  // Construction de l'objet produit
  constructor(private fb: FormBuilder,private produitService:ProduitService) { }

  // Validation du formulaire et serialisation-deserialisation 
  contactForm = this.fb.group({
    code: ['',[Validators.minLength(3), Validators.required]],
    nom: ['',[Validators.minLength(3), Validators.required]],
    qte: ['',[Validators.minLength(3), Validators.required]],
  });

  //Enregistrement de l'objet produit
  onSubmit() {
    
    if (!!localStorage.getItem("saveProduit")) {

      let iProduit: IProduit[] = []
      let local = localStorage.getItem("saveProduit")
      if (!!local)
        iProduit = JSON.parse(local)

        iProduit.push(this.contactForm.value)
      localStorage.setItem("saveProduit", JSON.stringify(iProduit))

    } else {
      let save: IProduit[] = []
      save.push(this.contactForm.value)
      localStorage.setItem("saveProduit", JSON.stringify(save))
    }

    this.produit = this.produitService.getProduit()
  }
  
  //Recuperation de la liste des produit a partir du local storage
  ngOnInit(): void {
    this.produit = this.produitService.getProduit()
  }

}
