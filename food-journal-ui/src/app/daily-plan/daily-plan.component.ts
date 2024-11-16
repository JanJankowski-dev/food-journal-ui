import {Component} from "@angular/core";
import {FoodService} from "../services/food/food-service";
import {DailyPlanDto, MealDto} from "./meal/meal.model";

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.css'
})
export class DailyPlanComponent {

  dailyPlans: DailyPlanDto | undefined

  constructor(private foodService: FoodService) {}

  getFood() {
    this.foodService.getDailyPlan().subscribe({
      next: (data) => {
        this.dailyPlans = data;
      },
      error: (error) => {
        console.error('Error during data fetching', error);
      }
    });
  }

}
