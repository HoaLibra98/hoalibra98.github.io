import { Component, OnInit } from '@angular/core';
import { AuthenServiceService } from '../Core/Services/authen-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authenticateService: AuthenServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticateService.test().toPromise();
    this.authenticateService.test().toPromise();
    this.authenticateService.test().toPromise();
  }

  logout() {
    this.authenticateService.LogOut();
    this.router.navigate(['login']);
  }
}
