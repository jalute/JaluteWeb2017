import { Injectable } from "@angular/core";
import {
  Card,
  CardValues,
  Suits
} from './card';

enum VegasPayoutHands
{
  PaiGow = 0,
  JacksOrBetterPair = 1,
  TwoPair = 2,
  ThreeOfKind = 3,
  Straight = 4,
  Flush = 6,
  FullHouse = 9,
  FourOfKind = 25,
  StraightFlush = 50,
  RoyalFlush = 800
}

@Injectable()
export class PokerService {

  getNewDeck(): Card[] {
    let idx = 0;
    let standard_deck: Card[] = [];

    for (let iValue = 1; iValue < 14; iValue++) {
      let cv: CardValues = <CardValues>iValue;
      for (let iSuit = 0; iSuit < 4; iSuit++) {
        let suit: Suits = <Suits>iSuit;
        let myCard = new Card;
        myCard.Suit = suit;
        myCard.Value = cv;
        myCard.rank = iValue;
        myCard.setCardOutput();
        if (suit == Suits.Diamonds || suit == Suits.Hearts) {
          myCard.color = 'red';
        }
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

  /// <summary>
  /// this looks for any pair
  /// </summary>
  /// <param name="sorted_hand">Card values in numeric order</param>
  /// <remarks>The values must be presorted before calling this function</remarks>
  /// <returns>True if pair found</returns>
  /** @type {function(array):boolean} */
  private HasPair(sorted_hand: CardValues[])
  {
    for (let idx = 0; idx <= sorted_hand.length - 2; idx++)
    {
      // check for pair
      if (sorted_hand[idx] == sorted_hand[idx + 1])
      {
        return true;
      }
    }

    return false;
  };

  /// <summary>
  /// This checks if the cards passed in are the same suit
  /// </summary>
  /// <param name="hand">The hand to check, must be at least 2 cards</param>
  /// <returns>True if all the cards are the same suit</returns>
  /** @type {function(array):boolean} */
  private HasFlush(hand: Card[]): boolean
  {
    for (let idx = 0; idx <= hand.length - 2; idx++) {
      if (hand[idx].Suit != hand[idx + 1].Suit){
        return false;   // any bad match and return false
      }
    }
    // if we get this far, all the suits are the same
    return true;
  };

  interpretHand(hand: Card[]): string {
    let result = this.evaluateHand(hand, false);
    //console.log("Evaluated hand: " + result);

    let myOutput = " ";

    switch(result) {
      case VegasPayoutHands.PaiGow:
        myOutput = " ";
        break;
      case VegasPayoutHands.Flush:
        myOutput = "Flush";
        break;
      case VegasPayoutHands.FourOfKind:
        myOutput = "Four of a Kind";
        break;
      case VegasPayoutHands.FullHouse:
        myOutput = "Full House";
        break;
      case VegasPayoutHands.JacksOrBetterPair:
        myOutput = "Jacks or Better";
        break;
      case VegasPayoutHands.RoyalFlush:
        myOutput = "Royal Flush";
        break;
      case VegasPayoutHands.Straight:
        myOutput = "Straight";
        break;
      case VegasPayoutHands.StraightFlush:
        myOutput = "Straight Flush";
        break;
      case VegasPayoutHands.ThreeOfKind:
        myOutput = "Three of a Kind";
        break;
      case VegasPayoutHands.TwoPair:
        myOutput = "Two Pair";
        break;
      default:
        myOutput = "unknown";
    }

    return myOutput;
  }


  // this function interprets the hand to return the payout of the 5 card poker hand
  // note: this function will crash if there are not 5 cards in the hand.
  /** @type {function(array, boolean):number} */
  evaluateHand(hand: Card[], isSorted: boolean): VegasPayoutHands {
    let sorted_hand = [hand[0].Value, hand[1].Value, hand[2].Value, hand[3].Value, hand[4].Value];
    let JACK = 11;
    let ACE = 1;

    // insertion sort - this is the fastest way for small arrays
    let value, j;
    if (!isSorted)  {
      for (let i = 1; i < 5; i++)
      {
        value = sorted_hand[i];
        j = i - 1;
        let done = false;
        do
        {
          if (sorted_hand[j] > value)
          {
            sorted_hand[j + 1] = sorted_hand[j];
            j--;
            if (j < 0) done = true;
          }
          else
            done = true;
        } while (!done);

        sorted_hand[j + 1] = value;
      }
    }

    // determine if hand has a pair, this will help performance doing this check first.
    let hasPair = this.HasPair(sorted_hand);


    if (sorted_hand[1] == sorted_hand[2] && sorted_hand[1] == sorted_hand[3] && sorted_hand[1] == sorted_hand[4])
    {
      return VegasPayoutHands.FourOfKind;
    }
    else if (sorted_hand[0] == sorted_hand[1] && sorted_hand[0] == sorted_hand[2] && sorted_hand[0] == sorted_hand[3])
    {
      return VegasPayoutHands.FourOfKind;
    }
    else if (sorted_hand[0] == sorted_hand[1] && sorted_hand[0] == sorted_hand[2] && sorted_hand[3] == sorted_hand[4])
    {
      return VegasPayoutHands.FullHouse;
    }
    else if (sorted_hand[0] == sorted_hand[1] && sorted_hand[2] == sorted_hand[3] && sorted_hand[2] == sorted_hand[4])
    {
      return VegasPayoutHands.FullHouse;
    }
    else if (hasPair == false
      && (sorted_hand[0] + 1 == sorted_hand[1]
        && sorted_hand[1] + 1 == sorted_hand[2]
        && sorted_hand[2] + 1 == sorted_hand[3]
        && sorted_hand[3] + 1 == sorted_hand[4]))
    {
      if (this.HasFlush(hand))
        return VegasPayoutHands.StraightFlush;
      else
        return VegasPayoutHands.Straight;
    }
    else if (hasPair == false
      && sorted_hand[0] == ACE   //  cardValues.A
      && (sorted_hand[1] == 10
        && sorted_hand[2] == JACK  //cardValues.J
        && sorted_hand[3] == 12 //cardValues.Q
        && sorted_hand[4] == 13))  //cardValues.K))
    {
      if (this.HasFlush(hand))
        return VegasPayoutHands.RoyalFlush;
      else
        return VegasPayoutHands.Straight;
    }
    else if (sorted_hand[0] == sorted_hand[1] && sorted_hand[0] == sorted_hand[2])
    {
      return VegasPayoutHands.ThreeOfKind;
    }
    else if (sorted_hand[1] == sorted_hand[2] && sorted_hand[1] == sorted_hand[3])
    {
      return VegasPayoutHands.ThreeOfKind;
    }
    else if (sorted_hand[2] == sorted_hand[3] && sorted_hand[2] == sorted_hand[4])
    {
      return VegasPayoutHands.ThreeOfKind;
    }
    else if (sorted_hand[0] == sorted_hand[1] && sorted_hand[2] == sorted_hand[3])    //22334
    {
      return VegasPayoutHands.TwoPair;
    }
    else if (sorted_hand[1] == sorted_hand[2] && sorted_hand[3] == sorted_hand[4])   //23344
    {
      return VegasPayoutHands.TwoPair;
    }
    else if (sorted_hand[0] == sorted_hand[1] && sorted_hand[3] == sorted_hand[4])   //22344
    {
      return VegasPayoutHands.TwoPair;
    }
    else if (sorted_hand[0] == sorted_hand[1] && (sorted_hand[0] >= JACK || sorted_hand[0] == ACE))
    {
      return VegasPayoutHands.JacksOrBetterPair;
    }
    else if (sorted_hand[1] == sorted_hand[2] && sorted_hand[1] >= JACK)
    {
      return VegasPayoutHands.JacksOrBetterPair;
    }
    else if (sorted_hand[2] == sorted_hand[3] && sorted_hand[2] >= JACK)
    {
      return VegasPayoutHands.JacksOrBetterPair;
    }
    else if (sorted_hand[3] == sorted_hand[4] && sorted_hand[3] >= JACK)
    {
      return VegasPayoutHands.JacksOrBetterPair;
    }
    else if (this.HasFlush(hand))
      return VegasPayoutHands.Flush;
    else
    // we got nothing
      return VegasPayoutHands.PaiGow;
  }
}
