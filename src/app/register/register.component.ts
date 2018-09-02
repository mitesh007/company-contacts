import { Component, OnInit } from '@angular/core';
import {RestService} from "../rest.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employeeObj:any;
  registered:boolean = false;
  pwdStrength:number = 0;
  strengthCheck:any;
  constructor(private rest:RestService) { }

  ngOnInit() {
    this.employeeObj = {
      firstName:"",
      lastName:"",
      emailId:"",
      phoneNum: "",
      password:"",
      aadhar:""
    };

    this.strengthCheck = {
      length:false,
      upperCase:false,
      lowerCase:false,
      specialChar:false,
      number:false
    }
  }

  register = () => {
    this.employeeObj.emailId = this.employeeObj.emailId + "@inmar.com";
    console.log(this.employeeObj);
    this.rest.register(this.employeeObj).subscribe(
      data => {
        this.registered = true;
      },
      err => {

      }
    );
  };

  validatePassword = () => {
    console.log(this.employeeObj.password);
    console.log(this.pwdStrength);
    if(this.employeeObj.password.length >= 8) {
      if( !this.strengthCheck.length) {
        this.pwdStrength = this.pwdStrength + 1;
      }

      this.strengthCheck.length = true;
      var re = /[0-9]/;
      if(re.test(this.employeeObj.password) && !this.strengthCheck.number) {
        this.pwdStrength = this.pwdStrength + 2;
        this.strengthCheck.number = true;
      }

      re = /[a-z]/;
      if(re.test(this.employeeObj.password) && !this.strengthCheck.lowerCase) {
        this.pwdStrength = this.pwdStrength + 2;
        this.strengthCheck.lowerCase = true;
      }

      re = /[A-Z]/;
      if(re.test(this.employeeObj.password) && !this.strengthCheck.upperCase) {
        this.pwdStrength = this.pwdStrength + 2;
        this.strengthCheck.upperCase = true;
      }

      re = /^\w+$/;
      if(re.test(this.employeeObj.password) && !this.strengthCheck.specialChar) {
        console.log("Inside char test")
        this.pwdStrength = this.pwdStrength + 3;
        this.strengthCheck.specialChar = true;
      }
    }


  }

}
