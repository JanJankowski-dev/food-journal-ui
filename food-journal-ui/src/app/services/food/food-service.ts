import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {DailyPlanDto} from "../types";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = `${environment.apiUrl}/food/daily-plan`;

  constructor(private http: HttpClient) { }

  getDailyPlan(): Observable<DailyPlanDto> {
    return this.http.get<DailyPlanDto>(this.apiUrl);
  }

}
