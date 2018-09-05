import {Component, OnInit, Input, OnChanges, ViewChild, Output, EventEmitter} from '@angular/core';
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
  @Input() groupId:number;
  @Output() dataChange = new EventEmitter<any>();
  groupsList:any[];
  status:boolean;
  contactList:any[];
  gridApi:any;
  columnDefs = [
    {headerName: 'First Name', field: 'firstName'},
    {headerName: 'Last Name', field: 'lastName' },
    {headerName: 'Phone Num', field: 'phoneNum'},
    {headerName: 'Active', field: 'isActive', valueGetter: "data.isActive == 1 ? 'Active' : 'Inactive'", volatile:true, cellRenderer: "agAnimateShowChangeCellRenderer"}
  ];
  constructor(private rest:RestService) { }

  ngOnChanges() {
    if(this.show) {
      this.status = false;
      this.contactList = null;

      this.loadGroup();
      this.open();
    }
  }

  loadGroup = () => {
    var userId = sessionStorage.getItem("loggedUserId");
    this.rest.getGroups(userId).subscribe(
      data => {
        this.groupsList = data;
        this.loadGroupData();
        this.groupsList.forEach(group => {
          group.checked = false;
        })
      },
      err => {
        console.log(err);
      }
    );
  };

  loadGroupData = () => {
    let active = this.groupsList.filter((group, index) => {
      return (
        group.groupId == this.groupId
      );
    })[0].isActive;
    this.loadContactsList();
    this.status = active == 1 ? true : false;
  };

  loadContactsList = () => {
    this.rest.getContacts(this.groupId).subscribe(
      data => {
        this.contactList = data;
      },
      err => {

      }
    );
  };

  deleteGroup = () => {
    this.rest.deleteGroup(this.groupId).subscribe(
      data => {
        this.loadGroup();
        this.dataChange.emit();
      }
    );
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
    this.rest.activateContacts(this.gridApi.getSelectedRows()).subscribe(
      data => {
        this.loadContactsList();
      }
    );
  };

  deActivateContacts = () => {
    this.rest.deActivateContacts(this.gridApi.getSelectedRows()).subscribe(
      data => {
        this.loadContactsList();
      }
    );
  };

  deleteContacts = () => {
    this.rest.deleteContacts(this.gridApi.getSelectedRows()).subscribe(
      data => {
        this.loadContactsList();
      }
    );
  };

  gridReady = ($event) => {
    this.gridApi = $event.api;
  }

}
