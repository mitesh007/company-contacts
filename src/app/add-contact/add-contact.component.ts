import {Component, OnInit, OnChanges, Input, Output} from '@angular/core';
import {RestService} from "../rest.service";
declare var $: any;

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnChanges {
  @Input() show:boolean;
  @Input() groupId:number;
  @Input() selContactInfo:any;
  @Input() id:string;
  groupsList:any[];
  contactInfo:any = {};
  success:boolean;
  isUpdate:boolean = false;
  constructor(private rest:RestService) { }


  ngOnChanges() {
    if(this.show) {
      var userId = sessionStorage.getItem("loggedUserId");
      this.rest.getGroups(userId).subscribe(
        data => {
          this.groupsList = data;
        },
        err => {
          console.log(err);
        }
      );
      if(this.selContactInfo && this.selContactInfo.length) {
        this.openModify();
      }
      else {
        this.open();
      }
    }
  }

  open = () => {
    this.contactInfo = {
      groupId: this.groupId,
      firstName:"",
      lastName: "",
      phoneNum:"",
      emailId: ""
    };
    setTimeout(()=>{
      $('#'+this.id).modal('show');
    },500);
  };

  openModify = () => {
    this.contactInfo = this.selContactInfo[0];
    var emailId = this.contactInfo.emailId;
    this.contactInfo.emailId = emailId.substr(0, emailId.indexOf('@inmar.com'));
    this.isUpdate = true;
    setTimeout(()=>{
      $('#'+this.id).modal('show');
    },500);
  };

  addContact = () => {
    this.contactInfo.emailId = this.contactInfo.emailId + "@inmar.com";
    this.rest.addContact(this.contactInfo).subscribe(
      data => {
        this.contactInfo = {
          groupId: this.contactInfo.groupId,
          firstName:"",
          lastName: "",
          phoneNum:"",
          emailId: ""
        };
        this.success = true;
      },
      err => {

      }
    );
  };

  updateContact = () => {
    this.contactInfo.emailId = this.contactInfo.emailId + "@inmar.com";
    this.rest.updateContact(this.contactInfo).subscribe(
      data => {
        this.success = true;
      },
      err => {

      }
    );
  }

}
