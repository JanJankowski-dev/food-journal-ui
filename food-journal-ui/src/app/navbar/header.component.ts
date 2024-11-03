import {Component} from '@angular/core';
import {KeycloakService} from "../services/keycloak/keycloak.service";
import {FoodService} from "../services/food/food-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'

})
export class HeaderComponent {
  constructor(private keyCloakService: KeycloakService,
              private foodService: FoodService) {
  }

  logout() {
    this.keyCloakService.logout().then(
      it => console.log("log out success " + it)
    );
  }

  getFood() {
    this.foodService.getDailyPlan()
  }
}
