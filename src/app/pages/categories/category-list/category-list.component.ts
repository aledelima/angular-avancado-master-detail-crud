import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista!')
    );
  }

  deleteCategory(category: Category) {
    const mustDelete = confirm('Deseja realmente efetuar a exclusão deste item?');

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(

        () => {
          this.categories = this.categories.filter(element => element.id !== category.id);
        },
        () => alert('Erro ao tentar excluir@')
      );
    }
  }

}
