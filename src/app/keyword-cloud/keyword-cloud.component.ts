import { Component } from '@angular/core';
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

const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);

@Component({
  selector: 'app-keyword-cloud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyword-cloud.component.html',
  styleUrls: ['./keyword-cloud.component.css'],
})
export class KeywordCloudComponent {
  public activity;
  public xData;
  public label;
  options: any;

  constructor() {
    const words = [
      'course',
      'bill',
      'squash',
      'proportion',
      'beneficiary',
      'choice',
      'experiment',
      'consumption',
      'density',
      'drink',
      'give',
      'feather',
      'medium',
      'image',
      'ethics',
      'poetry',
      'ballet',
      'economics',
      'copyright',
      'declaration',
      'instruction',
      'wisecrack',
    ];
    let sentence = '';
    for (var i = 0; i < 200; i++) {
      sentence += words[Math.floor(Math.random() * words.length)] + ' ';
    }

    // const word = words[Math.floor(Math.random() * words.length)];
    var text = sentence;
    var obj = { name: '', weight: 0 };
    var lines = text.split(/[,\. ]+/g),
      data = Highcharts.reduce(
        lines,
        function (arr, word) {
          obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
          });
          if (obj) {
            obj.weight += 1;
          } else {
            obj = {
              name: word,
              weight: 1,
            };
            arr.push(obj);
          }
          return arr;
        },
        []
      );

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
          data: data,
          name: 'Occurrences',
        },
      ],
      title: {
        text: '',
      },
    };
  }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }
}
