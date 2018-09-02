import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private route:Router) {
  }

  ngOnInit() {
    if(sessionStorage.getItem("loggedUser") == null) {
      this.route.navigate(['/login']);
    }
    else {
      this.route.navigate(['/manage']);
    }
  }
}
