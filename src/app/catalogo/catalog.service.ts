import { catchError } from 'rxjs/operators';
import {
  CatalogData,
  CatalogItem,
  CatalogBrand,
  CatalogType
} from './../types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getCatalogItems(): Observable<CatalogData> {
    return this.http
      .get<CatalogData>('http://localhost:5101/api/v1/catalog/items')
      .pipe(catchError(error => this._handleError(error)));
  }

  getCatalogItem(id: string): Observable<CatalogItem> {
    return this.http
      .get<CatalogData>(`http://localhost:5101/api/v1/catalog/items/${id}`)
      .pipe(catchError(error => this._handleError(error)));
  }

  getCatalogTypes(): Observable<CatalogType[]> {
    return this.http
      .get<CatalogType[]>('http://localhost:5101/api/v1/catalog/CatalogTypes')
      .pipe(catchError(error => this._handleError(error)));
  }

  getCatalogBrands(): Observable<CatalogBrand[]> {
    return this.http
      .get<CatalogBrand[]>('http://localhost:5101/api/v1/catalog/CatalogBrands')
      .pipe(catchError(error => this._handleError(error)));
  }

  addProduct(
    product: CatalogItem,
    file: Blob,
    fileName: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    product.PictureFileName = fileName;
    for (const key of Object.keys(product)) {
      formData.append(key, product[key]);
    }
    console.log(JSON.stringify(product));

    formData.append('file', file, fileName);
    return this.http
      .post('http://localhost:5101/api/v1/catalog/items', formData)
      .pipe(catchError(error => this._handleError(error)));
  }

  updateProduct(product: CatalogItem): Observable<any> {
    return this.http
      .post('http://localhost:5101/api/v1/catalog/items', product)
      .pipe(catchError(error => this._handleError(error)));
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request';
    return throwError(errorMsg);
  }
}
