import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../material/material.mosule';
import { DataComponent } from '../data/data.component';
import { FilterComponent } from '../filter/filter.component';
import { KeywordCloudComponent } from '../keyword-cloud/keyword-cloud.component';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    materialModules,
    DataComponent,
    FilterComponent,
    KeywordCloudComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  isFilter = true;
  overallProductDetails = new OverallProductDetails();
  lang = 'English';
  country = 'ae';
  searchKey = '';
  constructor(private commonService: CommonService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.queryParamMap.get('country') || 'ae';
    if (location.href.indexOf('ar-AE') > -1) {
      this.lang = 'Arabic';
    } else {
      this.lang = 'English';
    }
  }

  selectLan(event) {
    const lang = event.target.value;
    if (lang === 'Arabic') {
      location.href = '/ar-AE/login';
    } else {
      location.href = '/en-US/login';
    }
  }

  updateUrlParam(event) {
    const value = event.target.value;
    this.commonService.searchSubject$.next(value);
    // window.location.search = `?key=${value}`;
  }

  updateCountry(){
    setTimeout(() => {  
      this.commonService.searchSubject$.next(this.searchKey);
    });
  }
}

export class OverallProductDetails {
  totalRevenue: number = 0;
  avgRevenue: string = '';
  avgBsr: number = 0;
  avgPrice: string = '';
  avgRatting: number = 0;
  oppScore: string = '';
}
