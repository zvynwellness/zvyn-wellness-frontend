import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hmyservice } from '../common/hmyservice';
import { map } from 'rxjs/operators';  //rxjs short form for REACT JavaScript
import { HmyserviceCategory } from '../common/hmyservice-category';

@Injectable({
  providedIn: 'root'
})
export class HmyserviceService {

  private baseUrl = 'http://localhost:8080/api/hmyservice';

  private categoryUrl = 'http://localhost:8080/api/hmyservice-category';

  constructor(private httpClient: HttpClient) { }

  getHmyserviceList(theCategoryId: number): Observable<Hmyservice[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseHmyservices>(searchUrl).pipe(
      map(response => response._embedded.HMYService)
    );
  }

  getHmyserviceCategories(): Observable<HmyserviceCategory[]> {
    return this.httpClient.get<GetResponseHmyserviceCategory>(this.categoryUrl).pipe( //Call REST API
          map(response => response._embedded.HMYServiceCategory)  //Return an observable, Maps JSON data from Spring Data REST to HmyserviceCategory array
        );
  }
}

//Unwarp the JSON from Spring Data REST _embedded entry
interface GetResponseHmyservices {
  _embedded: {
    HMYService: Hmyservice[];
  }
}

//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseHmyserviceCategory {
  _embedded: {
    HMYServiceCategory: HmyserviceCategory[];
  }
}
