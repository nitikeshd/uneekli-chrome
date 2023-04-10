import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../material/material.mosule';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, materialModules, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  filterField: FilterField[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.filterField = [
      {
        name: 'Price',
        key: 'price',
        type: 'text',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Net Profit',
        key: 'netProfit',
        type: 'text',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Monthly Sales',
        key: 'monSales',
        type: 'text',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Fba Fees',
        type: 'text',
        key: 'fbaFee',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Monthly Revenue',
        type: 'text',
        key: 'moRevenue',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'LQS',
        type: 'text',
        key: 'lqs',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Rating text',
        type: 'text',
        key: 'rating',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Sellers',
        type: 'text',
        key: 'sellers',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Ratings',
        type: 'text',
        key: 'textOfRatings',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Weight',
        type: 'text',
        key: 'weight',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
      {
        name: 'Rank',
        type: 'text',
        key: 'rank',
        children: [
          {
            name: 'Minimum',
            type: 'text',
          },
          {
            name: 'Maximum',
            type: 'text',
          },
        ],
      },
    ];
  }

  filterData() {
    const filterMap = new Map<string, number[]>();
    const toFilter = this.filterField
      .filter((field) => {
        for (let child of field.children) {
          if (child.value > 0) {
            return true;
          }
        }
        return false;
      })
      .forEach((filter) => {
        filterMap.set(filter.key, [
          Number(filter.children[0].value) || 0,
          Number(filter.children[1].value) || Number.MAX_SAFE_INTEGER,
        ]);
      });
    this.commonService.filterSubject$.next(filterMap);
  }

  resetFilter() {
    this.filterField.forEach((filter) => {
      filter.children.forEach((child) => (child.value = null));
    });
    const filterMap = new Map<string, number[]>();
    this.commonService.filterSubject$.next(filterMap);
  }
}

export interface FilterField {
  name: string;
  type: string;
  value?: number;
  key?: string;
  children?: FilterField[];
}
