import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.css']
})
export class FloatingActionButtonComponent implements OnInit {
  @Input() showChatbot: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.showChatbot = !this.showChatbot;
  }

}
