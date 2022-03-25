import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
