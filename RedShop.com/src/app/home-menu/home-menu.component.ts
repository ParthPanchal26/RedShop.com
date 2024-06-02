import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit { 
  
  popularProducts: undefined | product[];
  homeProduct: undefined | product[];
  clothes: undefined | product[];

  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.popularProduct().subscribe((data) => {
      console.warn(data);
      this.popularProducts = data;
    });
    
    this.product.homeProducts().subscribe((data) => {
      console.warn(data);
      this.homeProduct = data.slice(0, 8);
      this.clothes = data.filter((product: { category: string; }) => product.category === 'Clothes').slice(0, 16);
      console.warn(this.clothes)
    });
  }
}
