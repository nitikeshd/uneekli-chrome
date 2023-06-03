import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterField } from '../filter/filter.component';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  filterSubject$ = new Subject<Map<string, number[]>>();
  searchSubject$ = new Subject<string>();

  country: string = 'ae';
  lan: string = 'en';
  constructor() {}
}
