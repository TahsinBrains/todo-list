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

  constructor() {

    //grab todos from localStorage
    const localTodos = localStorage.getItem('todos');
    this.todos$.next(JSON.parse(localTodos || '{}'));
   }

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16)
    };

    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
    this.saveToLocal(updatedTodos);
  }

  removeTodo(id: string): void {
    const updatedTodos =
      this.todos$.getValue().filter(todo => todo.id !== id);
    this.todos$.next(updatedTodos);
    this.saveToLocal(updatedTodos);
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      if(todo.id === id) {
        // todo.isCompleted = !todo.isCompleted;
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }

      return todo;
    });
    this.todos$.next(updatedTodos);
    this.saveToLocal(updatedTodos);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      if(todo.id === id) {
        // todo.text = text;
        return {
          ...todo,
          text
        }
      }

      return todo;
    });
    this.todos$.next(updatedTodos);
    this.saveToLocal(updatedTodos);
  }

  toggleAll(isCompleted: boolean ): void {
    const updatedTodos = this.todos$.getValue().map(todo => {
      return {
        ...todo,
        isCompleted
      }
    });
    this.todos$.next(updatedTodos);
    this.saveToLocal(updatedTodos);
  }

  changeFilter(filter: FilterEnum): void {
    this.filter$.next(filter);
  }

  saveToLocal(updatedTodos: TodoInterface[]) {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }
}
