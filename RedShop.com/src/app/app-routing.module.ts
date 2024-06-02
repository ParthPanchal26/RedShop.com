import { AuthGuard } from './auth.guard';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { ShopComponent } from './shop/shop.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SignUpOptionComponent } from './sign-up-option/sign-up-option.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SellerSelledProductsComponent } from './seller-selled-products/seller-selled-products.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-menu', pathMatch: 'full' },
  { path: 'home-menu', component: HomeMenuComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'navigation-bar', component: NavigationBarComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'sign-up-option', component:SignUpOptionComponent },
  { path: 'seller-auth', component:SellerAuthComponent },
  { path: 'seller-login', component:SellerLoginComponent },
  { path: 'seller-home', component:SellerHomeComponent, canActivate: [AuthGuard] },
  { path: 'seller-add-product', component:SellerAddProductComponent, canActivate: [AuthGuard] },
  { path: 'seller-update-product/:id', component:SellerUpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'search-page/:query', component:SearchPageComponent },
  { path: 'product-details/:productId', component:ProductDetailsComponent },
  { path: 'cart-page', component:CartPageComponent },
  { path: 'checkout', component:CheckoutComponent },
  { path: 'My-Orders', component:MyOrdersComponent },
  { path: 'contact-us', component:ContactUsComponent },
  { path: 'seller-selled-products', component:SellerSelledProductsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
