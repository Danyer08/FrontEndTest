import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {

  constructor(private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['account/login']);
  }

}
