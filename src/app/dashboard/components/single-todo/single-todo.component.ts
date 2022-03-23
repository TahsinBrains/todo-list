import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo-interface';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit, OnChanges {

  @Input('todo')
  todoProps!: TodoInterface;

  @Input('isEditing')
  isEditingProps!: boolean;

  @Output('setEditingId')
  setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput')
  textInput!: ElementRef;

  editingText: string = '';

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if(changes['isEditingProps'].currentValue) {
        this.textInput.nativeElement.focus();
      }
    }, 0)
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
