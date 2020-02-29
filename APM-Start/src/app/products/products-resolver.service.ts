import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, catchError} from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { ProductsResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<ProductsResolved> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductsResolved> {

      return this.productService.getProducts()
              .pipe(
                map(products => ({products: products}) ),
                catchError(error => {
                    const message = `Retriebal error: ${error}`;
                    console.error(message);
                    return of({products: null, error: message});
                })
              )
  };
}
