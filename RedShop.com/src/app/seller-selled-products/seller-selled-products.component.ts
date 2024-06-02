import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { order, product } from '../data-types';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-selled-products',
  templateUrl: './seller-selled-products.component.html',
  styleUrls: ['./seller-selled-products.component.css']
})
export class SellerSelledProductsComponent implements OnInit {

  orderData: order[] | undefined;
  deleteIcon = faTrash;

  customerEmail: string | undefined;
  customerContactNo: number | undefined;

  constructor(private product: ProductService) { }

  processMsg = "You will Receive Product in next 3-4 days, You can Cancel it anyTime";

  ngOnInit(): void {
    this.product.orderListSeller().subscribe((result) => {
      this.orderData = result;
      console.warn(this.orderData)
    });
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.product.orderList().subscribe((result) => {
        this.orderData = result;
      })
    })
  }

}
