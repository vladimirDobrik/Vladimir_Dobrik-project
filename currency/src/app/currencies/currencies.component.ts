import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency';
import { CurrencyService } from '../currency.service';
import { DateService } from '../date.service';

@Component({
  selector: 'currency-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  currencies: Currency[];
  prevCurrencies: Currency[];
  selectedCurrency: Currency;
  showSpinner: boolean = true;

  constructor(private currencyService: CurrencyService,
              private dateService: DateService) { }

  ngOnInit() {
    this.getCurrencies();
    this.getPrevCurrencies(this.dateService.getDateNthDayAgo(1));
    this.currencyService.selectedCurrency.subscribe(currency => this.onSelect(currency));
  }

  getCurrencies(date?: Date): void {
    this.currencyService.getCurrencies(date)
      .subscribe(currencies => this.currencies = currencies);
  }

  getPrevCurrencies(date?: Date): void {
    this.currencyService.getCurrencies(date)
      .subscribe(currencies => {
        setTimeout(()=>this.showSpinner = false, 1500);
        return this.prevCurrencies = currencies;
      });
  }

  getDif(index: number): number {
    let result: number = 0;
    let prevRate: number = 0;
    let curRate: number = 0;

    prevRate = Number(this.prevCurrencies[index].Cur_OfficialRate);
    curRate = Number(this.currencies[index].Cur_OfficialRate);

    result = prevRate - curRate;

    return result;
  }

  onSelect(selectedCurrency: Currency): void {
    this.selectedCurrency = this.currencies
      .find(currency => currency.Cur_ID === selectedCurrency.Cur_ID);
  }
}
