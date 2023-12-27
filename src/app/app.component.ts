import { Component } from '@angular/core';
import { AuthServiceService } from './Authentication/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularDemoApp';
  constructor(private authService:AuthServiceService){
      authService.logout();
  }
  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }
  logout(){
    this.authService.logout();
  }
}
