import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product;
  UpdateProductMsg: undefined | string = "";
  ImageURL: string = '';
  constructor(private route: ActivatedRoute, private product: ProductService, private Router: Router) { }

  base64String: string = '';
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.base64String = reader.result?.toString() ?? '';
      console.log('Base64 string:', this.base64String);
    };
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn("Product ID is : " + productId);

    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    });
  }

  submit(data: product) {
    console.warn(data);
    data.baseImg = this.base64String;

    if (this.productData) {
      data.id = this.productData.id
    }

    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.UpdateProductMsg = "Product Updated Successfully!"
      }
    });
    setTimeout(() => {
      this.UpdateProductMsg = undefined;
      this.Router.navigate(['/seller-home']);
    }, 1000)

  }

}
