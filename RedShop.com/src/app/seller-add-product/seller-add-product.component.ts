import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  constructor(private product: ProductService, private route: Router) { }
  
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
  }

  name: string = '';
  description: string = '';
  price: any = '';
  category: string = '';
  color: string = '';
  ImageURL: string = '';
  addProductMsg: string | undefined = '';
  date: string = '';

  submit(data: product) {

    const category = data.category;
    let sellerStore = localStorage.getItem('seller');
    let sellerData = sellerStore && JSON.parse(sellerStore)[0];
    let sellerId = sellerData.id;
    let sellerName = sellerData.provider_name;
    let sellerNo = sellerData.contactNo;
    let sellerEmail = sellerData.email;
    let baseImg = this.base64String;
    

    // Update the data object with the selected category
    const updatedData = {
      ...data,
      category: category,
      sellerId: sellerId,
      sellerName: sellerName,
      sellerNo: sellerNo,
      sellerEmail: sellerEmail,
      baseImg: baseImg,
    };

    this.product.addProduct(updatedData).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMsg = "Product Added";
        this.route.navigate(['/seller-home']);
      }
      setTimeout(() => (this.addProductMsg = undefined), 3000);
    });
  }

}
