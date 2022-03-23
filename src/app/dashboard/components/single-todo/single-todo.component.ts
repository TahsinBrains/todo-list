import { Component, Input, OnInit } from '@angular/core';
import { TodoInterface } from '../../types/todo-interface';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {

  @Input('todo')
  todoProps!: TodoInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
