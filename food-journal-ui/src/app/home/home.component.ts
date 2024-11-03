import {Component} from "@angular/core";
import {KeycloakService} from "../services/keycloak/keycloak.service";
import {FoodService} from "../services/food/food-service";
import {DailyPlanDto} from "../services/types";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent {

  dailyPlans: DailyPlanDto | undefined
  constructor(private foodService: FoodService) {
  }



  getFood() {
    this.foodService.getDailyPlan().subscribe({
      next: (data) => {
        this.dailyPlans = data;
        console.log('Dane pobrane:', data);
      },
      error: (error) => {
        console.error('Błąd podczas pobierania danych:', error);
      }
    });
  }
}
