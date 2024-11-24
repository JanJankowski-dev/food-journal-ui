import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MealDto} from './meal.model';
import {Observable} from 'rxjs';
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) {
  }

  createMeal(meal: MealDto, dailyPlanId: string): Observable<MealDto> {
    return this.http.post<MealDto>(`${environment.apiUrl}/daily-plan/${dailyPlanId}/meal`, meal);
  }
}
