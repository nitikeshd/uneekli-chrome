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
          data: this.userService.keywords.slice(0,100),
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

  generateKeyword(){
    // Array of keywords with their respective weights
    const keywords = [
      { keyword: 'JavaScript', weight: 9 },
      { keyword: 'HTML', weight: 7 },
      { keyword: 'CSS', weight: 5 },
      { keyword: 'Web Development', weight: 4 },
      { keyword: 'OpenAI', weight: 3 },
      { keyword: 'AI', weight: 3 },
      { keyword: 'Machine Learning', weight: 2 },
      { keyword: 'Chatbot', weight: 2 },
      { keyword: 'GPT-3.5', weight: 1 },
      { keyword: 'Keyword Cloud', weight: 1 },
    ];

    // Generate the keyword cloud
    const keywordCloud = document.getElementById('keywordCloud');
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i].keyword;
      const weight = keywords[i].weight;

      const span = document.createElement('span');
      span.textContent = keyword;
      span.style.fontSize = `${12 + weight * 2}px`;
      span.style.opacity = `${weight * 0.1}`;
      span.classList.add('keyword');

      const xPos = Math.random() * (keywordCloud.offsetWidth - span.offsetWidth);
      const yPos = Math.random() * (keywordCloud.offsetHeight - span.offsetHeight);
      const rotation = Math.random() * 360; // Random rotation angle between 0 and 360 degrees
      span.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation}deg)`;

      keywordCloud.appendChild(span);
    }
}
}
