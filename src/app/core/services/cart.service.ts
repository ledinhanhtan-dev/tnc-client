import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CART_API } from '@core/constants/api.constant';
import { EMPTY_CART } from '@core/constants/cart.constant';
import { Cart } from '@core/models/cart.model';
import { Product } from '@core/models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly active$ = new BehaviorSubject<boolean>(false);
  readonly cart$ = new BehaviorSubject<Cart>(EMPTY_CART);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  fetchCartData() {
    const sessionId = this.cookieService.get('sessionId');

    if (!sessionId) {
      this.http.get<Cart>(CART_API + 'new').subscribe(cart => {
        this.cookieService.set('sessionId', cart.sessionId);
        this.cart$.next(cart);
      });
    } else {
      this.http
        .get<Cart>(CART_API, { withCredentials: true })
        .subscribe(cart => this.cart$.next(cart));
    }
  }

  addToCart(productId: number) {
    this.http
      .get<Cart>(CART_API + 'add/' + productId, { withCredentials: true })
      .pipe(tap(() => this.active$.next(true)))
      .subscribe(cart => this.cart$.next(cart));
  }

  increaseItemQty(cartItemId: number) {
    this.http
      .get<Cart>(CART_API + 'plus/' + cartItemId, { withCredentials: true })
      .subscribe(cart => this.cart$.next(cart));
  }

  decreaseItemQty(cartItemId: number) {
    this.http
      .get<Cart>(CART_API + 'minus/' + cartItemId, { withCredentials: true })
      .subscribe(cart => this.cart$.next(cart));
  }

  removeFromCart(cartItemId: number) {
    this.http
      .get<Cart>(CART_API + 'remove/' + cartItemId, { withCredentials: true })
      .subscribe(cart => this.cart$.next(cart));
  }

  deleteCart() {
    this.http
      .get<Cart>(CART_API + 'delete', { withCredentials: true })
      .subscribe(_ => this.cart$.next(EMPTY_CART));
  }

  openModal() {
    this.active$.next(true);
  }

  closeModal() {
    this.active$.next(false);
  }
}
