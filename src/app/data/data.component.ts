import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CommonService } from '../service/common.service';
import { FilterField } from '../filter/filter.component';
import { OverallProductDetails } from '../home/home.component';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit, OnDestroy {
  @Output() filterToggle: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  overallProductDetails: OverallProductDetails;
  tableData: Product[] = [];
  tableDataFiltered: Product[] = [];
  loader: boolean = false;
  error: boolean = false;
  destroySub$ = new Subject();
  productData = {
    asin: true,
    title: true,
    price: true,
    buyBox: true,
    sales: true,
    category: true,
    fbaFee: true,
    sale: true,
    brand: true,
    imageUrl: true,
    netProfit: true,
    rating: true,
    totalReviews: true,
    sponsored: true,
    amazonChoice: true,
    bestSeller: true,
    amazonPrime: true,
    itemAvailable: true,
    lPosition: true,
    gPosition: true,
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService,
    private service: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    const keyword = this.route.snapshot.queryParamMap.get('key');
    this.loader = true;
    this.filterData();
   
    this.service.customerDetails(localStorage.getItem('email')).subscribe({
        next: (data: any) => {
          if (data) {
            const planValidTill = new Date(
              data.planValidTill
            );
            if (new Date() > planValidTill) {
              window.open("https://uneekli-tweg.netlify.app/en-US/payment", '_blank');
            }
          }
        },
        error: (err) => {
          localStorage.clear();
          this.router.navigate(['/login']);
        },
      });

    this.http
      .get<Product[]>(`https://pd2.uneekli.com/search/${keyword}`)
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
        let totalPrice = 0;
        let totalRating = 0;
        this.tableData.forEach((product) => {
          totalPrice += Number(product.price);
          totalRating += Number(product.rating);
        });
        this.overallProductDetails.avgPrice = (
          totalPrice / this.tableData.length
        ).toFixed(2);
        this.overallProductDetails.avgRatting =
          totalRating / this.tableData.length;
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

  sortData(key: string, asc: boolean = true) {
    this.tableDataFiltered = this.sortByKey(
      this.tableDataFiltered,
      key,
      this.productData[key]
    );
    this.productData[key] = !this.productData[key];
  }

  sortByKey(array, key: string, asc: boolean) {
    // Custom compare function for sorting the array
    const compare = (a, b) => {
      a[key] = !isNaN(Number(a[key])) ? Number(a[key]) : a[key];
      b[key] = !isNaN(Number(b[key])) ? Number(b[key]) : b[key];
      if (a[key] < b[key]) {
        return asc ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return asc ? 1 : -1;
      }
      return 0;
    };

    return array.sort(compare);
  }

  addProduct(product: Product) {
    const requestObj = {
      email: localStorage.getItem('email'),
      product,
    };
    this.http
      .post(
        'https://user-service-production-66f8.up.railway.app/products',
        requestObj
      )
      .pipe(
        map((res: any) => res.response),
        catchError((err) => of('error'))
      )
      .subscribe((data) => {
        if (data === 'error') {
          this.snackBar.open('Technical issue please try latter', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          return;
        }
        this.snackBar.open(
          'Product has been added to your track list',
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      });
  }

  shareProduct(url: string) {
    navigator.clipboard.writeText(url);
    this.snackBar.open('Product url is copied to clipboard', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  copyAsin(asin: string) {
    navigator.clipboard.writeText(asin);
    this.snackBar.open('ASIN is copied to clipboard', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnDestroy(): void {
    this.destroySub$.next('destroy');
    this.destroySub$.complete();
  }
}

interface Product {
  email: string;
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
  score: string;
}
