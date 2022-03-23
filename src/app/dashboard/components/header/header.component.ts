import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  text = new FormControl('', Validators.minLength(5));

  constructor(private todoService: TodosService) {}

  // changeText(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.text = target.value;
  // }

  addTodo(): void {
    this.todoService.addTodo(this.text.value);
    this.text.reset();
  }

  ngOnInit(): void {
  }

}
