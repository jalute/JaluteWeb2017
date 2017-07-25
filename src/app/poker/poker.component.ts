import { Component, OnInit } from '@angular/core';
import {PokerService} from "./poker.service";
import {Card} from "./card";

@Component({
  templateUrl: 'poker.component.html',
  styleUrls: ['poker.component.css'],
  providers: [PokerService]
})
export class PokerComponent implements OnInit {
  pageTitle: string = 'Video Poker - Jacks or Better';
  deck: Card[];
  pokerHand: Card[];
  credits: number = 100;
  handPayout: string;
  dealDisabled: string;
  drawDisabled: string;

  constructor(private _pokerService: PokerService) {

  }

  ngOnInit(): void {
    console.log('In OnInit');

    this.deck = this._pokerService.getNewDeck();
  }

  onCardClick(card: Card): void {
    if (card.hold == 'HOLD')
      card.hold = '.';
    else
      card.hold = 'HOLD';
  }

  onDealClick(currentDeck: Card[]): void {
    // make sure the hand is set to HOLD anymore
    for (let i = 1; i < 52; i++) {
      currentDeck[i].hold = ".";
    }

    let shuffledDeck = this._pokerService.vegasShuffle(currentDeck);
    let localHand = [shuffledDeck[0], shuffledDeck[1], shuffledDeck[2], shuffledDeck[3], shuffledDeck[4]];

    // output variables for screen
    this.handPayout = this._pokerService.interpretHand(localHand);
    this.deck = shuffledDeck;
    this.pokerHand = localHand;
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
