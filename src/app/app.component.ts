import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router'
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clinic-pro';
  router = inject(Router);
  auth = inject(AuthService);
  userLoggedIn = this.auth.isLoggedIn();
  logout(){
    this.auth.logout()
    if(!this.userLoggedIn){
      this.router.navigate(['/login']);
    }
  }
}
