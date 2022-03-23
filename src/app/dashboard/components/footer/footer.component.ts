import { Component, OnInit } from '@angular/core';
import { map, mapTo, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  activeCount$: Observable<number>;
  noTodoClass$: Observable<boolean>;
  itemsLeftText$: Observable<string>;

  constructor(private todosService: TodosService) {
    // chk number of active tasks
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter(todo => !todo.isCompleted).length)
    );

    // chk wether todo list is empty
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    // append s to 'item' according to number of tasks left
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => {
        const pluralString = activeCount !== 1 ? 's' : '';
        return `item${pluralString} left`;
      })
    )
   }

  ngOnInit(): void {
  }

}
