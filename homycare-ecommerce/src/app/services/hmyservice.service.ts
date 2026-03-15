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

    getHmyserviceList(theCategoryId: number): Observable<Hmyservice[]> {

      // need to build URL based on category id
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

      return this.httpClient.get<GetResponse>(searchUrl).pipe(
        map(response => response._embedded.HMYService)
      );
    }
}

interface GetResponse { //Unwarp the JSON from Spring Data REST _embedded entry
  _embedded: {
    HMYService: Hmyservice[];
  }
}
