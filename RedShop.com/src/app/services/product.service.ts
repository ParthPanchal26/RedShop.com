import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, product } from '../data-types';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>()

  constructor(private http: HttpClient, private route: Router) { }

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    let sellerStore = localStorage.getItem('seller');
    let sellerId = sellerStore && JSON.parse(sellerStore)[0].id;
    return this.http.get<product[]>('http://localhost:3000/products?sellerId='+ sellerId);
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }

  popularProduct() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=1`);
  }

  homeProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit`);
  }

  shopProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products`);
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data)
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  orderListSeller() {
    // debugger;
    let sellerStore = localStorage.getItem('seller');
    let sellerId = sellerStore && JSON.parse(sellerStore)[0].id;
    return this.http.get<order[]>('http://localhost:3000/orders?sellerId='+ sellerId);
  }
  
  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }

 sellerSelledInfo(data:any){
  return this.http.post<any>('http://localhost:3000/selledInfo', data);
 }

  
}
