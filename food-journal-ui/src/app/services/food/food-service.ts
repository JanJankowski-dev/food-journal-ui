import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = `${environment.apiUrl}/food`;

  constructor(private http: HttpClient) { }

  getFood(): Observable<String> {
    return this.http.get<String>(this.apiUrl);
  }



}
