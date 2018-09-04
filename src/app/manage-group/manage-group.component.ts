import {Component, OnInit, Input, OnChanges, ViewChild} from '@angular/core';
import {RestService} from "../rest.service";
import {AgGridNg2} from "ag-grid-angular";
declare var $: any;

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css']
})
export class ManageGroupComponent implements OnChanges {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @Input() show:boolean;
  groupsList:any[];
  groupId:number;
  status:boolean;
  contactList:any[];
  gridApi:any;
  columnDefs = [
    {headerName: 'First Name', field: 'firstName'},
    {headerName: 'Last Name', field: 'lastName' },
    {headerName: 'Phone Num', field: 'phoneNum'},
    {headerName: 'Active', field: 'isActive'}
  ];
  constructor(private rest:RestService) { }

  ngOnChanges() {
    if(this.show) {
      this.groupId = 0;
      this.status = false;
      this.contactList = null;
      var userId = sessionStorage.getItem("loggedUserId");
      this.rest.getGroups(userId).subscribe(
        data => {
          this.groupsList = data;
          this.groupsList.forEach(group => {
            group.checked = false;
          })
        },
        err => {
          console.log(err);
        }
      );
      this.open();
    }
  }

  loadGroupData = () => {
    let active = this.groupsList.filter((group, index) => {
      return (
        group.groupId == this.groupId
      );
    })[0].isActive;
    this.rest.getContacts(this.groupId).subscribe(
      data => {
        this.contactList = data;
      },
      err => {

      }
    );
    this.status = active == 1 ? true : false;
  };

  open = () => {
    setTimeout(()=>{
      $('#manage-groups').modal('show');
    },500);
  };


  updateStatus = ($event) => {
    var group = this.groupsList.filter((group, index) => {
      return (
        group.groupId == this.groupId
      );
    })[0];
    if($event) {
      group.isActive = 0;
      this.rest.activeGroup(this.groupId, 0).subscribe();
    }
    else {
      group.isActive = 1;
      this.rest.activeGroup(this.groupId, 1).subscribe();
    }

    this.status = !$event;
  };

  activateContacts = () => {
    this.rest.activateContacts(this.gridApi.getSelectedRows()).subscribe();
  };

  deActivateContacts = () => {
    console.log(this.getSelectedContacts());
    this.rest.deActivateContacts(this.gridApi.getSelectedRows()).subscribe();
  };

  deleteContacts = () => {
    this.rest.deleteContacts(this.gridApi.getSelectedRows()).subscribe();
  };

  getSelectedContacts = () => {
    var contacts = this.contactList.filter((contact, index) => {
      return (
        contact.checked == true
      );
    });

    return contacts;
  };

  selectionChanged = ($event) => {

  };

  gridReady = ($event) => {
    this.gridApi = $event.api;
  }

}
