import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {DailyPlanDto} from "../../daily-plan/meal/meal.model";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) {
  }

  getDailyPlan(): Observable<DailyPlanDto> {
    return this.http.get<DailyPlanDto>(`${environment.apiUrl}/daily-plan/${new Date().toJSON().slice(0, 10)}`);
  }

}
