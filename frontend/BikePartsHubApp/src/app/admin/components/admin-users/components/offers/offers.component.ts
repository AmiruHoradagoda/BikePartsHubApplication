import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
 @Input() userId!: string;
  ngOnInit() {
    // Fetch orders for this user
  }
}
