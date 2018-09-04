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
  erroLogin:boolean = false;
  constructor(private rest:RestService, private route:Router) { }

  ngOnInit() {
  }

  login = () => {
    this.username = this.username + "@inmar.com";
    this.rest.login({userName:this.username, password:this.password}).subscribe(
      data => {
        this.erroLogin = false;
        console.log(data);
        sessionStorage.setItem("loggedUser", this.username);
        sessionStorage.setItem("loggedUserId", data.userId);
        this.route.navigate(['/manage']);
      },
      err => {
        this.erroLogin = true;
        this.username = "";
        this.password = "";
        console.log(err);
      }
    );
  }

}
