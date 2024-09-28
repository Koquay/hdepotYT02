import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { StoreProduct, StoreProducts } from './product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "/api/product";

  constructor(
    private httpClient:HttpClient,
    private store:Store
  ) { }

  public getProducts = (productsSidebar) => {
    const sidebarFilters = this.createFilterParams(productsSidebar);

    const params = new HttpParams({
      fromObject: { sidebarFilters: sidebarFilters },
    });

    this.httpClient
      .get<{ products; productCount }>(this.url, { params: params })
      .pipe(
        tap((productData) => {
          console.log('productData', productData);
          this.store.dispatch(StoreProducts({ productData }));
        }),
        catchError(error => {
          console.log('error', error)
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        }) 
      )
      .subscribe();
  };

  private createFilterParams(productsSidebar) {
    console.log('ProductService.productsSidebar', productsSidebar);
    const brandFilters = productsSidebar.brands.brands.filter(
      (brand) => brand.checked
    );
    console.log('ProductService.brandFilters', brandFilters);

    const brands = [];

    for (let brand of brandFilters) {
      brands.push(brand.name);
    }

    const priceFilters = productsSidebar.priceFilter.priceRange.filter(
      (range) => range.checked
    );

    console.log('ProductService.priceFilters', priceFilters);

    const priceRanges = [];
    for (let priceRange of priceFilters) {
      priceRanges.push(priceRange.range);
    }

 
    const ratingFilters = productsSidebar.ratings.ratings.filter(
      (filter) => filter.checked
    );
    console.log('ProductService.ratingFilters', ratingFilters);

    const ratings = [];

    for (let rating of ratingFilters) {
      ratings.push(rating.rating);
    }

    // let sortFilter = productsSidebar.sortFilters.filters.filter(
    //   (filter) => filter.checked == true
    // );

    const filters = {
      brands: brands,
      priceRanges: priceRanges,
      ratings: ratings,
      // sortFilter: sortFilter[0],
      pageNo: productsSidebar.pageNo,
      pageSize: productsSidebar.pageSize,
    };

    console.log('filters', filters);
    return JSON.stringify(filters);
  }


  public getSelectedProduct = (productId) => {
    const params = new HttpParams({
      fromObject: { productId: productId },
    });

    this.httpClient
      .get(`${this.url}/productId`, { params: params })
      .pipe(
        tap((product) => {
          console.log('product', product);
          this.store.dispatch(StoreProduct({ product }));
        }),
        catchError(error => {
          console.log('error', error)
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        }) 
      )
      .subscribe();
  }
}
