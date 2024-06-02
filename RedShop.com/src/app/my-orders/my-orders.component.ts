import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { order } from '../data-types';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData: order[] | undefined;
  sellerData: any[] | undefined;
  deleteIcon = faTrash;
  conditionCancel: boolean = false;
  canceledOrders: number[] = [];
  
  constructor(private product: ProductService, private http: HttpClient) { }

  processMsg = "You will Receive Product in next 3-4 days, You can Cancel it anyTime";
  

  ngOnInit(): void {
    this.product.orderList().subscribe((result) => {
      this.orderData=result;
     });

    this.product.orderList().subscribe((result) => {
      this.sellerData = Object.values(result[0]);
     });

     this.fetchOrderData();
  }

  // cancelOrder(orderId:number|undefined){
  //   orderId && this.product.cancelOrder(orderId).subscribe((result) => {
  //     this.product.orderList().subscribe((result) => {
  //       this.orderData=result;
  //      }) 
  //   })
  // }

  fetchOrderData(): void {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
      this.retrieveCanceledOrders();
    });
  }

  retrieveCanceledOrders(): void {
    const canceledOrderIds: number[] = JSON.parse(localStorage.getItem('canceledOrders') || '[]');
    this.canceledOrders = canceledOrderIds;
    this.updateCancelStatus();
  }

  updateCancelStatus(): void {
    if (this.orderData) {
      this.orderData.forEach((order: order) => {
        if (order[0]) {
          if (this.canceledOrders.includes(order[0].productId)) {
            order[0].canceled = true;
          } else {
            order[0].canceled = false;
          }
        }
      });
    }
  }

  cancel(order: any) {
    if (order && order[0]) {
      order[0].canceled = true;
      this.conditionCancel = true;
      this.canceledOrders.push(order[0].productId);
      this.updateCanceledStatusInDb(order[0].id);
      this.updateLocalStorage();
    }
  }

  updateCanceledStatusInDb(orderId: number) {
    this.http.patch<any>(`http://localhost:3000/orders/${orderId}`, { canceled: true })
      .subscribe(() => {
        console.log('Order cancellation status updated in db.json');
      }, (error) => {
        console.error('Failed to update order cancellation status in db.json:', error);
      });
  }

  updateLocalStorage(): void {
    localStorage.setItem('canceledOrders', JSON.stringify(this.canceledOrders));
  }

}
