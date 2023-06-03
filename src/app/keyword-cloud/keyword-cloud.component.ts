import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Highcharts from 'highcharts';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
import * as newdata from './data';
import { CommonService } from '../service/common.service';
import { UserService } from '../service/user.service';
import { mergeMap, switchMap } from 'rxjs';

const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);

@Component({
  selector: 'app-keyword-cloud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyword-cloud.component.html',
  styleUrls: ['./keyword-cloud.component.css'],
})
export class KeywordCloudComponent implements OnInit{
  public activity;
  public xData;
  public label;
  keywords: any;
  options: any;

  constructor(private commonService: CommonService, private userService: UserService) {
    
  }

  ngOnInit() {
    // console.log(this.userService.keywords);
    this.options = {
      chart: {
        height: '600',
      },
      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            '<h5>{chartTitle}</h5>' +
            '<div>{chartSubtitle}</div>' +
            '<div>{chartLongdesc}</div>' +
            '<div>{viewTableButton}</div>',
        },
      },
      series: [
        {
          type: 'wordcloud',
          data: this.userService.keywords.length > 100 ? this.userService.keywords.slice(0,100) : this.userService.keywords.length,
          name: 'Occurrences',
        },
      ],
      title: {
        text: '',
      },
    };
    Highcharts.chart('container', this.options);
    // this.generateKeyword();
    // this.commonService.searchSubject$.pipe(
    //   switchMap((searchTerm) =>  this.userService.getKeywords(searchTerm, this.commonService.lan, this.commonService.country.toUpperCase()))
    // ).subscribe((keywords: any) => {
    //   this.keywords = Object.keys(keywords).map((key) => ({name: key, weight: keywords[key]['search volume']}));
    //   Highcharts.chart('container', this.options);
    // })
    
  }
}
