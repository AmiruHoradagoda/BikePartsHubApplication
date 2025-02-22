import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-customer-view',
  templateUrl: './admin-customer-view.component.html',
  styleUrls: ['./admin-customer-view.component.css']
})
export class AdminCustomerViewComponent implements OnInit {
  activeTab = 'Profile';
  tabs = ['Profile', 'Orders', 'Schedules'];
  userId!: string;
  profile: any; // Replace with proper interface

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    // Fetch user profile data here
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}