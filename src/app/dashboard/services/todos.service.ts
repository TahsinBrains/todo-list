import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo-interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  constructor() { }

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16)
    };

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean ): void {
    console.log('isCompleted', isCompleted);
    const updatedTodos = this.todos$.getValue().map(todo => {
      return {
        ...todo,
        isCompleted
      }
    });
    this.todos$.next(updatedTodos);
  }

  changeFilter(filter: FilterEnum): void {
    this.filter$.next(filter);
  }
}
