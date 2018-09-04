import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {RestService} from "../rest.service";
declare var $: any;

@Component({
  selector: 'app-create-group',
  templateUrl: 'create-group.component.html',
  styleUrls: ['create-group.component.css']
})
export class CreateGroupComponent implements OnChanges {

  @Input() show:boolean;
  groupName:string;
  success:boolean;
  constructor(private rest:RestService) { }

  ngOnChanges() {
    if(this.show) {
      this.open();
    }
  }

  open = () => {
    setTimeout(()=>{
      $('#add-group').modal('show');
    },500);
  };

  createGroup = () => {
    var userId = sessionStorage.getItem("loggedUserId");
    this.rest.createGroup(this.groupName, userId).subscribe(
      data => {
        this.groupName = "";
        this.success = true;
        //this.closeGroup();
      },
      err => {

      }
    );
  };
}
