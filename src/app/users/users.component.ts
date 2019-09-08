import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpServicesService } from '../services/http-services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  headers = ['Firstname', 'Lastname', 'Email', 'Last Visit'];

  constructor(private httpService: HttpServicesService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.httpService.getUsers().then(users => {
      this.users = users;
    }).catch(error => {
      alert(error.error.errors.message);
    });
  }

}
