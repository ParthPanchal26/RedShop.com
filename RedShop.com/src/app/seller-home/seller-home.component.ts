import { product } from './../data-types';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[];
  deleteMsg: undefined | string;

  deleteIcon = faTrash;
  updateProduct = faEdit;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list();
  };

  deleteProduct(id: number) {
    console.warn(id);
    this.clickMethod("", id);
  }

  clickMethod(name: string, id: number) {
    if (confirm("Are you sure to delete " + name)) {
      this.product.deleteProduct(id).subscribe((result) => {
        if (result) {
          // this.deleteMsg = "One Product deleted successfully!";
          this.list();
        }
      })
    }
  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }

}
