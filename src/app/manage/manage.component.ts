import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {RestService} from "../rest.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  groupsList:any[];
  showModal:boolean = false;
  groupName:string;
  selectedGroupId:number;
  contactsList:any[];
  constructor(private renderer:Renderer2, private elem:ElementRef, private rest:RestService, private route:Router) {
    if(sessionStorage.getItem("loggedUser") == null) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.rest.getGroups().subscribe(
      data => {
        this.groupsList = data;
        this.setSelectedGroup(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  setSelectedGroup = (groupId) => {
    this.selectedGroupId = groupId;
    this.rest.getContacts(groupId).subscribe(
      data => {
        this.contactsList = data;
      },
      err => {

      }
    );
  };

  open = () => {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
    }, 500)
  };

  openGroup = () => {
    this.renderer.addClass(this.elem.nativeElement.querySelector("#context-menu-add-group"), "show");
  };

  closeGroup = () => {
    this.renderer.removeClass(this.elem.nativeElement.querySelector("#context-menu-add-group"), "show");
  };

  createGroup = () => {
    this.rest.createGroup(this.groupName).subscribe(
      data => {
        console.log(data);
        this.closeGroup();
      },
      err => {

      }
    );
  };

  logout = () => {
    sessionStorage.clear();
    this.route.navigate(['/login']);
  };

  updateStatus = ($event, groupId) => {
    if($event) {
      this.rest.activeGroup(groupId, 0).subscribe();
    }
    else {
      this.rest.activeGroup(groupId, 1).subscribe();
    }
  };

  contactStatus = ($event, contactId) => {
    if($event) {
      this.rest.activeContact(contactId, 0).subscribe();
    }
    else {
      this.rest.activeContact(contactId, 1).subscribe();
    }
  }
}
