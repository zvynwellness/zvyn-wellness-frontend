import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hmyservice } from '../common/hmyservice';
import { map } from 'rxjs/operators';  //rxjs short form for REACT JavaScript

@Injectable({
  providedIn: 'root'
})
export class HmyserviceService {

  private baseUrl = 'http://localhost:8080/api/hmyservice';
  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Hmyservice[]> { //Return an observable of Product array. Map the JSON data from Spring Data REST to Product array
        return this.httpClient.get<GetResponse>(this.baseUrl).pipe( //inject HttpClient and use it to call the backend API
          map(response => response._embedded.HMYService)
}

interface GetResponse { //Unwarp the JSON from Spring Data REST _embedded entry
  _embedded: {
    HMYService: Hmyservice[];
  }
}
