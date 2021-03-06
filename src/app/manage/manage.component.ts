import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {RestService} from "../rest.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  groupsList:any[] = [];
  showContactModal:boolean = false;
  selectedContact:any;
  showManageGroup:boolean = false;
  showCreateGroup:boolean = false;
  showModContactModal:boolean = false;
  groupName:string;
  selectedGroupId:number;
  gridApi:any;
  contactsList:any[] =[] ;
  columnDefs = [
    {headerName: 'First Name', field: 'firstName' },
    {headerName: 'Last Name', field: 'lastName' },
    {headerName: 'Email Id', field: 'emailId'},
    {headerName: 'Phone Num', field: 'phoneNum'},
    {headerName: 'Active', field: 'isActive', valueGetter: "data.isActive == 1 ? 'Active' : 'Inactive'"}
  ];
  constructor(private renderer:Renderer2, private elem:ElementRef, private rest:RestService, private route:Router) {
    if(sessionStorage.getItem("loggedUser") == null) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.loadGroup();
  }

  loadGroup = () => {
    var userId = sessionStorage.getItem("loggedUserId");
    this.rest.getGroups(userId).subscribe(
      data => {
        this.groupsList = data;
        this.setSelectedGroup(data[0].groupId);
      },
      err => {
        console.log(err);
      }
    );
  };

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

  addNewContact = () => {
    this.showContactModal = true;
    setTimeout(() => {
      this.showContactModal = false;
    }, 500)
  };

  openGroup = () => {
    this.showCreateGroup = true;
    setTimeout(() => {
      this.showCreateGroup = false;
    }, 500)
  };

  manageGroup = () => {
    this.showManageGroup = true;
    setTimeout(() => {
      this.showManageGroup = false;
    }, 500)
  };

  closeGroup = () => {
    this.renderer.removeClass(this.elem.nativeElement.querySelector("#context-menu-add-group"), "show");
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

  modifySelectedContact = ($event) => {
    this.showModContactModal = true;
    setTimeout(() => {
      this.showModContactModal = false;
    }, 500)
  };

  setSelectedContact = () => {
    this.selectedContact = this.gridApi.getSelectedRows();
  };

  gridReady = ($event) => {
    this.gridApi = $event.api;
    this.gridApi.onRowDoubleClicked = (data:any) => {
      console.log(data);
    }
  }

}
