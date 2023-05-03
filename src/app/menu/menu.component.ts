import { AsyncPipe } from '@angular/common/src/pipes/async_pipe';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
