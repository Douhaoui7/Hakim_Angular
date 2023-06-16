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
  appState: string = 'create'
  editIndex = 1
  fileConvert = ""

  // Construction de l'objet produit
  constructor(private fb: FormBuilder,private produitService:ProduitService) { }

  // Validation du formulaire et serialisation-deserialisation
  contactForm = this.fb.group({
    code: ['',[Validators.minLength(3), Validators.required]],
    nom: ['',[Validators.minLength(3), Validators.required]],
    qte: ['',[Validators.minLength(3), Validators.required]],
    image: [''],
  });

  //Enregistrement de l'objet produit
  onSubmit() {


    if (this.appState === 'create') {
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

  } else if (this.appState === 'edit') {

    if (!!localStorage.getItem("saveProduit")) {

      let iProduit: IProduit[] = []
      let local = localStorage.getItem("saveProduit")
      if (!!local)
        iProduit = JSON.parse(local)

      iProduit.splice(this.editIndex, 1, this.contactForm.value);
      localStorage.setItem("saveProduit", JSON.stringify(iProduit))

    }
    this.appState = 'create'

  }

  this.contactForm.reset()
  this.produit = this.produitService.getProduit()

}
deleteProduct(produit: IProduit, index: number) {
  if (!!localStorage.getItem("saveProduit")) {

    let iProduit: IProduit[] = []
    let local = localStorage.getItem("saveProduit")
    if (!!local)
      iProduit = JSON.parse(local)

    iProduit.splice(index, 1);
    localStorage.setItem("saveProduit", JSON.stringify(iProduit))

    this.produit = this.produitService.getProduit()

  }

}
updateProduct(produit: IProduit, index: number) {

  this.contactForm.get('code')?.setValue(produit.code.toString());
  this.contactForm.get('nom')?.setValue(produit.nom.toString());
  this.contactForm.get('qte')?.setValue(produit.qte);
  this.contactForm.get('image')?.setValue(produit.image);
  this.appState = 'edit';
  this.editIndex = index
}


handleInputChange(event: any) {
  let fileList: FileList = event.target.files;
  const file: File = fileList[0];
  console.log(file)
  var reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(this.contactForm.value)
  reader.onloadend = () => {
    const base64data = reader.result;
    this.contactForm.get('image')?.setValue(base64data);
    console.log(this.contactForm.value)
  }
}



  //Recuperation de la liste des produit a partir du local storage
  ngOnInit(): void {
    this.produit = this.produitService.getProduit()
  }

}
