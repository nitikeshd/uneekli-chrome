import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CommonService } from '../service/common.service';
import { FilterField } from '../filter/filter.component';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit, OnDestroy {
  @Output() filterToggle: EventEmitter<string> = new EventEmitter<string>();
  tableData: Product[] = [];
  tableDataFiltered: Product[] = [];
  loader: boolean = false;
  error: boolean = false;
  destroySub$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    const keyword = this.route.snapshot.queryParamMap.get('key');
    this.loader = true;
    this.filterData();
    this.http
      .get<Product[]>(`http://localhost:3000/search/${keyword}`)
      .pipe(
        catchError(() => {
          this.error = true;
          return of([]);
        })
      )
      .subscribe((data) => {
        this.tableData = data;
        this.tableDataFiltered = this.tableData;
        this.loader = false;
      });
  }

  filterData() {
    this.commonService.filterSubject$
      .pipe(takeUntil(this.destroySub$))
      .subscribe((filters: Map<string, number[]>) => {
        this.tableDataFiltered = this.tableData;
        const keys = [...filters.keys()];

        if (keys.length < 0) {
          return;
        }

        this.tableDataFiltered = this.tableData.filter((data) => {
          let boolean = true;
          keys.forEach((key) => {
            boolean =
              data[key] > filters.get(key)[0] &&
              data[key] < filters.get(key)[1];
          });
          return boolean;
        });
        this.filterToggle.emit('filterToggle');
      });
  }

  ngOnDestroy(): void {
    this.destroySub$.next('destroy');
    this.destroySub$.complete();
  }
}

interface Product {
  asin: string;
  title: string;
  price: number;
  buyBox: string;
  sales: boolean;
  category: string;
  fbaFee: number;
  sale: number;
  brand: string;
  imageUrl: string;
  netProfit: number;
  rating: number;
  totalReviews: number;
  sponsored: boolean;
  amazonChoice: boolean;
  bestSeller: boolean;
  amazonPrime: boolean;
  itemAvailable: boolean;
  lPosition: number;
  gPosition: number;
}
