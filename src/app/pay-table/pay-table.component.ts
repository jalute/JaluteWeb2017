import { Component } from '@angular/core';
import { IVegasPayTable } from './vegas-pay-table';

@Component({
  selector: 'pay-table',
  templateUrl: 'pay-table.component.html'
})

export class PayTableComponent {
  payTable: IVegasPayTable[] = [
    {
      "hand": "Royal Flush",
      "payout": 250
    },
    {
      "hand": "Straight Flush",
      "payout": 50
    },
    {
      "hand": "Four of Kind",
      "payout": 25
    },
    {
      "hand": "Full House",
      "payout": 9
    },
    {
      "hand": "Flush",
      "payout": 6
    },
    {
      "hand": "Straight",
      "payout": 4
    },
    {
      "hand": "Three of a Kind",
      "payout": 3
    },
    {
      "hand": "Two Pair",
      "payout": 2
    },
    {
      "hand": "Jacks or Better",
      "payout": 1
    },
  ]
}
