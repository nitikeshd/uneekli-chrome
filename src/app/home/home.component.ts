import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../material/material.mosule';
import { DataComponent } from '../data/data.component';
import { FilterComponent } from '../filter/filter.component';
import { KeywordCloudComponent } from '../keyword-cloud/keyword-cloud.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    materialModules,
    DataComponent,
    FilterComponent,
    KeywordCloudComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isFilter = true;
  overallProductDetails = new OverallProductDetails();
  constructor() {}
  updateUrlParam(event) {
    const value = event.target.value;
    window.location.search = `?key=${value}`;
  }
}

export class OverallProductDetails {
  totalRevenue: number = 0;
  avgRevenue: number = 0;
  avgBsr: number = 0;
  avgPrice: string = '';
  avgRatting: number = 0;
}
