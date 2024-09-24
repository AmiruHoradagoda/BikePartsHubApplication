import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
