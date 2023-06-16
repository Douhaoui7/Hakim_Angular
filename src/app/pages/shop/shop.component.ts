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
  public shop: IShop[] = [];
  appState: string = 'create';
  editIndex = 1;
  fileConvert = '';

  constructor(private fb: FormBuilder, private shopService: ShopService) {}

  contactForm = this.fb.group({
    nom: ['', [Validators.minLength(3), Validators.required]],
    adresse: ['', [Validators.minLength(3), Validators.required]],
    image: [''],
  });

  ngOnInit(): void {
    this.shop = this.shopService.getShop();
  }

  onSubmit() {
    if (this.appState === 'create') {
      if (!!localStorage.getItem('saveShop')) {
        let iShop: IShop[] = [];
        let local = localStorage.getItem('saveShop');
        if (!!local) iShop = JSON.parse(local);

        iShop.push(this.contactForm.value);
        localStorage.setItem('saveShop', JSON.stringify(iShop));
      } else {
        let save: IShop[] = [];
        save.push(this.contactForm.value);
        localStorage.setItem('saveShop', JSON.stringify(save));
      }

      this.shop = this.shopService.getShop();
    } else if (this.appState === 'edit') {
      if (!!localStorage.getItem('saveShop')) {
        let iShop: IShop[] = [];
        let local = localStorage.getItem('saveShop');
        if (!!local) iShop = JSON.parse(local);
        iShop.splice(this.editIndex, 1, this.contactForm.value);
        localStorage.setItem('saveShop', JSON.stringify(iShop));
      }
    }
    this.contactForm.reset();
    this.shop = this.shopService.getShop();
  }

  deleteShop(shop: IShop, index: number) {
    if (!!localStorage.getItem('saveShop')) {
      let iShop: IShop[] = [];
      let local = localStorage.getItem('saveShop');
      if (!!local) iShop = JSON.parse(local);
      iShop.splice(index, 1);

      localStorage.setItem('saveShop', JSON.stringify(iShop));

      this.shop = this.shopService.getShop();
    }
  }

  updateShop(shop: IShop, index: number) {
    this.contactForm.get('adresse')?.setValue(shop.adresse.toString());
    this.contactForm.get('nom')?.setValue(shop.nom.toString());
    this.appState = 'edit';
    this.editIndex = index;
  }

}
