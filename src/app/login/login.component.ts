import { Component, OnInit } from '@angular/core';
import {RestService} from "../rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  constructor(private rest:RestService, private route:Router) { }

  ngOnInit() {
  }

  login = () => {
    this.username = this.username + "@inmar.com";
    this.rest.login({userName:this.username, password:this.password}).subscribe(
      data => {
        sessionStorage.setItem("loggedUser", this.username);
        this.route.navigate(['/manage']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
