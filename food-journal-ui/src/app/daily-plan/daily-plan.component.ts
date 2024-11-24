import {Component, OnInit} from "@angular/core";
import {FoodService} from "../services/food/food-service";
import {DailyPlanDto} from "./meal/meal.model";
import {MatDialog} from "@angular/material/dialog";
import {MealCreateComponent} from "./meal/meal-create.component";

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.css'
})
export class DailyPlanComponent implements OnInit {

  dailyPlans: DailyPlanDto | undefined

  constructor(private foodService: FoodService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getFood();
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
      data: {dailyPlanId: this.dailyPlans != undefined ? this.dailyPlans.id: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFood();
    });
  }

}
