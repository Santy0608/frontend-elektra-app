import { Component } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SharingDataServiceCategory } from '../../services/sharing-data-category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  errors: any;
  categories: Category[] = []
  nameSearch: string = '';

  constructor(
  private categoryService: CategoryService,
  private router: Router,
  private sharingDataService: SharingDataServiceCategory
) {
  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras?.state) {
    this.categories = navigation.extras.state['categories'];
  }
}


  ngOnInit(): void {
    if (this.categories == undefined || this.categories == null || this.categories.length == 0){
      console.log("Category List");
      this.categoryService.categoryList().subscribe(categories => this.categories = categories);
    }
  }

  onRemoveCategory(id: number){
     // Buscar la categoría dentro del listado
  const category = this.categories.find(c => c.idCategory === id);
  if (!category) {
    console.error(`Categoría no encontrada con el Id: ${id}`);
    return;
  }
  // Validar si la categoría está completada
//  if (categoria.estado === "completado") {
//    Swal.fire({
//      title: "Acción no permitida",
//      text: "No puedes eliminar una categoría completada.",
//      icon: "error"
//    });
//    return; // Detener la ejecución
//  }

  Swal.fire({
    title: "¿Estás Seguro?",
    text: "Cuidado, esta categoría será eliminada del sistema",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.categoryService.deleteCategoryById(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.idCategory !== id);

          // Navegación (si es necesaria)
          this.router.navigate(['/categories/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/categories'], { state: { categories: this.categories } });
          });

          Swal.fire("¡Eliminado!", "La categoría ha sido eliminada exitosamente", "success");
        },
        error: (err) => {
          console.error(err);
          Swal.fire("Error", "Hubo un problema al eliminar la categoría", "error");
        }
      });
    }
  });
  }

  OnSelectedCategory(category: Category): void{
      this.router.navigate(['/categories/edit', category.idCategory])
  }

  chargeCategories(): void {
    this.categoryService.categoryList().subscribe(categories => {
      this.categories = categories;
      console.log("Categories ready to be listed", this.categories);
    }, error => {
      console.log("Error while charging categoriew: ", error);
    })
  }
}
