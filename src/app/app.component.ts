import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // importado Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'motorx';

  constructor(private router: Router) {}

  
}
