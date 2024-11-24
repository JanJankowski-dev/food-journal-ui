import {Component} from "@angular/core";
import {FoodService} from "../services/food/food-service";
import {DailyPlanDto} from "./meal/meal.model";
import {MatDialog} from "@angular/material/dialog";
import {MealCreateComponent} from "./meal/meal-create.component";

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.css'
})
export class DailyPlanComponent {

  dailyPlans: DailyPlanDto | undefined

  constructor(private foodService: FoodService, public dialog: MatDialog) {
  }

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

  openModal(): void {
    const dialogRef = this.dialog.open(MealCreateComponent, {
      width: '60%',
      data: { /* pass data if needed */}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
