import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MealService} from './meal.service';
import {Unit} from './meal.model';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html',
  styleUrls: ['./meal-create.component.css'],
})
export class MealCreateComponent {
  mealForm: FormGroup;
  units = Object.values(Unit);

  constructor(
    private fb: FormBuilder,
    private mealService: MealService,
    public dialogRef: MatDialogRef<MealCreateComponent>,
  ) {
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

  closeModal(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.mealForm.valid) {
      const meal = this.prepareMealDto();
      this.mealService.createMeal(meal, "1").subscribe({
        next: (response) => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error creating meal:', error);
        }
      });
    } else {
    }
  }

  private prepareMealDto(): any {
    const formValues = this.mealForm.value;
    return {
      ...formValues,
      time: formValues.time
    };
  }
}
