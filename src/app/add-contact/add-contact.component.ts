import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {RestService} from "../rest.service";
declare var $: any;

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnChanges {
  @Input() show:boolean;
  groupsList:any[];
  contactInfo:any = {};
  success:boolean;

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
      this.open();
    }
  }

  open = () => {
    this.contactInfo = {
      groupId:0,
      firstName:"",
      lastName: "",
      phoneNum:"",
      emailId: ""
    };
    setTimeout(()=>{
      $('#add-contacts').modal('show');
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
  }

}
