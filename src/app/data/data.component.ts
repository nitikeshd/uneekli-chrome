import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  tableData: Product[] = [];
  loader: boolean = false;
  error: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit(): void {
    const keyword = this.route.snapshot.queryParamMap.get('key');
    this.loader = true;
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
        this.loader = false;
      });
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
