import { Component, OnInit } from '@angular/core';

import { Currency } from '../currency';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'currency-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult: Currency[];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
  }

  search(term: string): void {
    this.searchResult = this.currencyService.searchCurrencies(term);
  }
}