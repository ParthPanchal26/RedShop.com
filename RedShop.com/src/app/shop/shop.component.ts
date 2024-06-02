import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  homeProduct: undefined | product[];

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data;
      // this.homeProduct = data.filter((product: { category: string; }) => product.category === 'T-shirt');
    });
  }

  viewPhone(){
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.filter((product: { category: string; }) => product.category === 'Smartphone & tablets');
    });
  }

  viewKichenAndHome(){
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.filter((product: { category: string; }) => product.category === 'Home & Kitchen');
    });
  }

  viewClothes(){
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.filter((product: { category: string; }) => product.category === 'Clothes');
    });
  }

  viewBeautyAndPersonalCare(){
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.filter((product: { category: string; }) => product.category === 'Beauty & Personal Care');
    });
  }

  viewSportsAndOutdoor(){
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.filter((product: { category: string; }) => product.category === 'Sports & Outdoors');
    });
  }

  viewGadgets(){
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.filter((product: { category: string; }) => product.category === 'Gadgets');
    });
  }

  viewToyAndGames(){
    this.product.shopProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.filter((product: { category: string; }) => product.category === 'Toys & Games');
    });
  }


}
