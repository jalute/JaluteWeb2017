import { Injectable } from "@angular/core";
import {
  Card,
  CardValues,
  Suits
} from './card';

@Injectable()
export class CardService {
  GetNewDeck(): Card[] {
    let idx = 0;
    let standard_deck = new Card[52];

    for (let iValue = 1; iValue < 14; iValue++) {
      let cv: CardValues = <CardValues>iValue;
      for (let iSuit = 0; iSuit < 4; iSuit++) {
        let suit: Suits = <Suits>iSuit;
        let myCard = new Card;
        myCard.Suit = suit;
        myCard.Value = cv;
        myCard.rank = iValue;
        standard_deck[idx] = myCard;
        idx++;
      }
    }

    if (standard_deck.length == 52) {
      console.log("successful deck created!")
    }
    return standard_deck;
  }

  shuffleSplit(deck: Card[], NumOfSteps: number): Card[] {
    if (NumOfSteps == undefined) NumOfSteps = 2;
    let NumOfCards = deck.length;
    let shuffled_deck = [];

    for (let start = 0; start < NumOfSteps; start++)
    {
      for (let idx = start; idx < NumOfCards; idx += NumOfSteps)
      {
        shuffled_deck.push(deck[idx]);
      }
    }
    return shuffled_deck;
  }


  /// <summary>
  /// This debugging function was created to verify that the suffling functions didn't duplicate cards in the deck.
  /// </summary>
  /// <param name="deck">The deck of cards to verify</param>
  /// <param name="iMax">Optional parameter, it will default to the length of the deck.</param>
  /// <returns></returns>
  checkForDups (deck: Card[], iMax: number): boolean {
    if (iMax == 0) iMax = deck.length;

    for (let idx = 0; idx < iMax - 1; idx++) {
      for (let y = idx + 1; y < iMax; y++) {
        if (deck[idx].rank == deck[y].rank && deck[idx].Suit == deck[y].Suit) {
          console.log("Duplicate card found at position " + idx + " and " + y);
          return true;
        }
      }
    }

    return false;  // everything ok
  }

  vegasShuffle (deck: Card[]): Card[] {
    let short_deck : Card[] = deck;
    let shuffled_deck = [];

    let pos = 0;

    for (let idx = deck.length - 1; idx >= 0; idx += -1)
    {
      if (idx == 0)
      {
        shuffled_deck[51] = short_deck[0];
      }
      else
      {
        // pick a random car (number) from the unshuffled deck
        let z = Math.floor((Math.random() * idx) + 1);
        //var z = (rr * idx).toFixed(0);  // this trims the decimal

        shuffled_deck.push(short_deck[z]);

        // remove card and rebuild short deck

        let tmp = [];
        for (let c in short_deck)
        {
          if (!short_deck[z].equals(short_deck[c]))
          {
            tmp.push(short_deck[c]);
          }
        }
        short_deck = tmp;
      }

    }

    return shuffled_deck;
  }
}
