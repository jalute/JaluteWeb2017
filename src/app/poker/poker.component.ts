import { Component, OnInit } from '@angular/core';
import {PokerService} from "./poker.service";
import {Card} from "./card";

@Component({
  templateUrl: 'poker.component.html',
  styleUrls: ['poker.component.css'],
  providers: [PokerService]
})
export class PokerComponent implements OnInit {
  pageTitle: string = 'Video Poker';
  deck: Card[];
  pokerHand: Card[];
  credits: number = 100;
  handPayout: string;
  dealDisabled: string;
  grayArea: string;


  constructor(private _pokerService: PokerService) {

  }

  ngOnInit(): void {
    console.log('In OnInit');

    this.deck = this._pokerService.getNewDeck();
    this.pokerHand = [this.deck[0], this.deck[1], this.deck[2], this.deck[3], this.deck[4]];
    this.grayArea = 'gray-area';
  }


  onDealClick(event: any, currentDeck: Card[], pokerHand: Card[]): void {
    // make sure the hand is set to HOLD anymore
    //console.log('event', event);

    if (event.target.innerText == 'Deal') {
      this.grayArea = '';
      this.credits--;
      console.log('In deal section...');
      for (let i = 1; i < 52; i++) {
        currentDeck[i].hold = "";
      }

      let shuffledDeck = this._pokerService.vegasShuffle(currentDeck);
      let localHand = [shuffledDeck[0], shuffledDeck[1], shuffledDeck[2], shuffledDeck[3], shuffledDeck[4]];

      // output variables for screen
      this.handPayout = this._pokerService.interpretHand(localHand);
      this.deck = shuffledDeck;
      this.pokerHand = localHand;
      event.target.innerText = "Draw";
    }
    else {
      console.log('In draw section...');
      this.grayArea = 'gray-area';
      let nextPos = 5;

      for (let i = 0; i < 5; i++ ) {
        if (pokerHand[i].hold != 'HOLD') {
          pokerHand[i] = currentDeck[nextPos];
          nextPos = nextPos + 1;
        }
      }

      this.handPayout = this._pokerService.interpretHand(pokerHand);
      var iPay = this._pokerService.evaluateHand(pokerHand, false);
      this.credits += iPay;
      if (iPay > 0) {
        this.handPayout+= '<br>' +
          'You Win ' + iPay + '!';
      }
      else {
        this.handPayout = 'You Lose';
      }
      event.target.innerText = "Deal";
    }
  }

  onDrawClick(pokerHand: Card[], currentDeck: Card[]): void {
    // first determine which cards to discard
    let nextPos = 5;

    for (let i = 0; i < 5; i++ ) {
      if (pokerHand[i].hold != 'HOLD') {
        pokerHand[i] = currentDeck[nextPos];
        nextPos = nextPos + 1;
      }
    }

    this.handPayout = this._pokerService.interpretHand(pokerHand);
  }
}
