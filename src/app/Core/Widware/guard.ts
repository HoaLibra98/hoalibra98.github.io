import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenServiceService } from '../Services/authen-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Guard {

  constructor(
    private router: Router,
    private authenServiceService: AuthenServiceService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenServiceService.isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
