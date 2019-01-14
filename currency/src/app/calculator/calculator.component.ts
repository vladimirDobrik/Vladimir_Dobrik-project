import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Currency } from '../currency';

@Component({
  selector: 'currency-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  currencies: Currency[];

  value: number;
  firstCurrencyRate: number;
  secondCurrencyRate: number;
  exchangeResult: number;

  roundChkbxChecked: boolean = true;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getCurrencies()
      .subscribe(currencies => this.currencies = currencies);
  }

  ngAfterContentChecked() {
    this.calcExchangeResult();
  }

  calcExchangeResult() {
    if(this.value && this.firstCurrencyRate && this.secondCurrencyRate === undefined) {
      if(this.roundChkbxChecked) {
        this.exchangeResult = Number((this.value * this.firstCurrencyRate).toFixed(4));
      } else {
        this.exchangeResult = this.value * this.firstCurrencyRate;
      }
    }

    if(this.value && this.firstCurrencyRate && this.secondCurrencyRate) {
      if(this.roundChkbxChecked) {
        this.exchangeResult = Number(((this.value * this.firstCurrencyRate) / this.secondCurrencyRate).toFixed(4));
      } else {
        this.exchangeResult = (this.value * this.firstCurrencyRate) / this.secondCurrencyRate;
      }
    }

    if(!this.value || !this.firstCurrencyRate) {
      this.exchangeResult = null;
    }
  }
}