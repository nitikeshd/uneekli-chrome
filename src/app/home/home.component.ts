import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../material/material.mosule';
import { DataComponent } from '../data/data.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, materialModules, DataComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor() {}
  updateUrlParam(event) {
    const value = event.target.value;
    window.location.search = `?key=${value}`;
  }
}
