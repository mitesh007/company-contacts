import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.css']
})
export class TogglerComponent implements OnInit {

  @Input() active:boolean;
  @Output() onToggle = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  statusToggled = () => {
    this.onToggle.emit(this.active);
  }

}
