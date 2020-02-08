import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private dataSharingService: DataSharingService) { }
  username: String;
  ngOnInit() {
    this.dataSharingService.changeNavBar.subscribe(change => {
      this.username = this.authService.getUsername();;
    });
  }

  ngOnDestroy(){
    this.dataSharingService.changeNavBar.unsubscribe();
  }
}
