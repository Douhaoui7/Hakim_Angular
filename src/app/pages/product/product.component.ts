import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ProduitService } from './produit.service';
import { IProduit } from './produit';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('buttonAnimation', [
      state('inactive', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('active', style({
        transform: 'scale(1.1)',
        opacity: 0.8
      })),
      transition('inactive => active', animate('300ms ease-out')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ],
})
export class ProductComponent implements OnInit {
  showProductForm: boolean = false;
  buttonState: string = 'inactive';
  public produit: IProduit[] = [];
  appState: string = 'create';
  editIndex = 1;
  fileConvert = '';

  contactForm = this.fb.group({
    code: ['ADFG', [Validators.minLength(3), Validators.required]],
    nom: ['HAKIM', [Validators.minLength(3), Validators.required]],
    qte: ['1', [Validators.minLength(3), Validators.required]],
    image: [''],
  });

  constructor(private fb: FormBuilder, private produitService: ProduitService) { }

  onSubmit() {

    try {
      if (this.appState === 'create') {
        let iProduit: IProduit[] = [];
        const local = localStorage.getItem('saveProduit');
        if (local) {
          iProduit = JSON.parse(local);
        }
        iProduit.push(this.contactForm.value);
        localStorage.setItem('saveProduit', JSON.stringify(iProduit));
      } else if (this.appState === 'edit') {
        let iProduit: IProduit[] = [];
        const local = localStorage.getItem('saveProduit');
        if (local) {
          iProduit = JSON.parse(local);
        }
        iProduit.splice(this.editIndex, 1, this.contactForm.value);
        localStorage.setItem('saveProduit', JSON.stringify(iProduit));
        this.appState = 'create';
      }
    } catch (error) {
      console.error('Erreur lors de l\'accès au stockage local:', error);
      // Gérer l'erreur appropriée
    }

    this.contactForm.reset();
    this.produit = this.produitService.getProduit();

    this.showProductForm = false;
  }


  addNewProduct() {

    this.showProductForm = true;

    // Réinitialise le formulaire et l'état de l'application pour ajouter un nouveau produit

    this.contactForm.reset();
    this.appState = 'create';
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


  this.showProductForm = true;

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
