import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { IShop } from './shop';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  showShopForm: boolean = false;
  shop: IShop[] = [];
  appState: string = 'create';
  editIndex: number = -1;
  fileConvert: string = '';

  contactForm = this.fb.group({
    nom: ['', [Validators.minLength(3), Validators.required]],
    adresse: ['', [Validators.minLength(3), Validators.required]],
    image: ['']
  });

  constructor(private fb: FormBuilder, private shopService: ShopService) {}

  onSubmit() {
    try {
      if (this.appState === 'create') {
        const iShop = JSON.parse(localStorage.getItem('saveShop') || '[]') as IShop[];
        iShop.push(this.contactForm.value);
        localStorage.setItem('saveShop', JSON.stringify(iShop));
      } else if (this.appState === 'edit' && this.editIndex >= 0) {
        const iShop = JSON.parse(localStorage.getItem('saveShop') || '[]') as IShop[];
        iShop.splice(this.editIndex, 1, this.contactForm.value);
        localStorage.setItem('saveShop', JSON.stringify(iShop));
        this.appState = 'create';
      }
    } catch (error) {
      console.error('Erreur lors de l\'accès au stockage local:', error);
      // Handle the error appropriately
    }

    this.contactForm.reset();
    this.shop = this.shopService.getShop();
    this.showShopForm = false;
  }

    addNewShop() {

    this.showShopForm = true;

    // Réinitialise le formulaire et l'état de l'application pour ajouter un nouveau produit

    this.contactForm.reset();
    this.appState = 'create';
  }

  deleteShop(shop: IShop, index: number) {
    const iShop = JSON.parse(localStorage.getItem('saveShop') || '[]') as IShop[];
    iShop.splice(index, 1);
    localStorage.setItem('saveShop', JSON.stringify(iShop));
    this.shop = this.shopService.getShop();
  }

  updateShop(shop: IShop, index: number) {

    this.showShopForm = true;

    this.contactForm.get('adresse')?.setValue(shop.adresse.toString());
    this.contactForm.get('nom')?.setValue(shop.nom.toString());
    this.appState = 'edit';
    this.editIndex = index;
  }

  ngOnInit(): void {
    this.shop = this.shopService.getShop();
  }
}
