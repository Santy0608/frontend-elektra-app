import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharingDataServiceCategory } from '../../services/sharing-data-category.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit{

  errors!: any;
  category!: Category;

  constructor(private router: Router, private sharingDataService: SharingDataServiceCategory, private categoryService: CategoryService, private route: ActivatedRoute){
    this.category = new Category();
  }

  ngOnInit(): void {
    this.sharingDataService.errorsCategoryFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingDataService.selectCategoryEventEmitter.subscribe(category => this.category = category);
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('idCategory') || '0');
      if (id > 0){
        this.categoryService.findCategoryById(id).subscribe(category => this.category = category);
      }
    })
  }


 onSubmit(categoryForm: NgForm): void {
  if (categoryForm.invalid) return;

  const category = categoryForm.value;

  if (this.category.idCategory > 0) {
    this.categoryService.updateCategory(this.category).subscribe(
      categoryUpdated => {
        Swal.fire({
          title: "¡Updated!",
          text: "¡Category updated succesfully!",
          icon: "success"
        });
        this.router.navigate(['/categories']);
      },
      error => {
        this.sharingDataService.errorsCategoryFormEventEmitter.emit(error);
      }
    );
  } else {
    this.categoryService.saveCategory(this. category).subscribe(
      newCategory => {
        Swal.fire({
          title: "¡Created!",
          text: "¡Category created succesfully!",
          icon: "success"
        });
        this.router.navigate(['/categories']);
      },
      error => {
        this.sharingDataService.errorsCategoryFormEventEmitter.emit(error);
      }
    );
  }
}


  onClear(categoryForm: NgForm): void{
    this.category = new Category();
    categoryForm.reset();
    categoryForm.resetForm();
  }



}
