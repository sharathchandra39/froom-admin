import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.css']
})
export class SideNavContentComponent {
  navItems = [
    { label: 'Home', route: '/home'},
    { label: 'Froom-Orders', route: '/froom-orders'},
    { label: 'Froom-Locations', route: '/froom-locations'},
    { label: 'Merchant-Management', route: '/merchant-updates'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onNavigationSelection(navItem: any) {
    this.router.navigate([navItem.route]);
  }
}
