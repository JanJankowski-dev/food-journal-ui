import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MealService } from './meal.service';
import { Unit } from './meal.model';

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html',
  styleUrls: ['./meal-create.component.css']
})
export class MealCreateComponent {
  mealForm: FormGroup;
  units = Object.values(Unit);

  constructor(private fb: FormBuilder, private mealService: MealService) {
    this.mealForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      time: ['', Validators.required],
      ingredients: this.fb.array([])
    });
  }

  get ingredients(): FormArray {
    return this.mealForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    const ingredientForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0.01)]],
      unit: [null, Validators.required]
    });
    this.ingredients.push(ingredientForm);
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onSubmit(): void {
    if (this.mealForm.valid) {
      const meal = this.prepareMealDto();
      this.mealService.createMeal(meal, "1").subscribe({
        next: (response) => {

        },
        error: (error) => {
          console.error('Error creating meal:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  private prepareMealDto(): any {
    const formValues = this.mealForm.value;
    const mealDto = {
      ...formValues,
      time: formValues.time
    };
    return mealDto;
  }
}
