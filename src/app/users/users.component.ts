import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpServicesService } from '../services/http-services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [
    {
      firstname: 'Marcos',
      lastname: 'Gonzales',
      email: 'm.gonzales@gmail.com',
      company: 'MCTekk'
    },
    {
      firstname: 'Lucas',
      lastname: 'Martinez',
      email: 'l.martinez@gmail.com',
      company: 'MCTekk'
    },
    {
      firstname: 'Carlos',
      lastname: 'Guzman',
      email: 'c.guzman@gmail.com',
      company: 'MCTekk'
    }
  ];
  headers = ['Firstname', 'Lastname', 'Email', 'Company'];

  constructor(private httpService: HttpServicesService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.httpService.getUsers().then(response => {
      this.users = response;
    }).catch(error => {
      alert(error.message);
    });
  }

}
