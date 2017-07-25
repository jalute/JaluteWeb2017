import {IComparable} from "typescript-dotnet-umd/System/IComparable";

  export enum Suits {Spade,Hearts,Diamonds,Clubs}
  export enum CardValues { Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }

//var cardSuits = {Spade: '♠', Hearts: '♥', Diamonds: '♦', Clubs: '♣'};

  export interface ICard {
    rank: number,
    value: CardValues,
    suit: Suits,
    cardOutput: string,
    hold: string,
    color: string
  }

  export class Card implements IComparable<Card> {
    private _value: CardValues;
    private _suit: Suits;
    rank: number;
    cardOutput: string;
    hold: string;
    color: string;

    compareTo(obj: Card): number
    {
      if (this._value == obj.Value) return 0;
      else if (this._value > obj.Value) return 1;
      else return -1;
    }

    equals(obj: Card): boolean
    {
      return(this._value == obj.Value && this._suit == obj.Suit);
    }

    get Value(): CardValues {
      return this._value;
    }
    set Value(cardValue: CardValues) {
      if (cardValue == undefined) throw "Card value missing";
      this._value = cardValue;
    }

    get Suit(): Suits {
      return this._suit;
    }
    set Suit(suit: Suits) {
      if (suit == undefined) throw "Card suit missing";
      this._suit = suit;
    }

    public setCardOutput(): void {
      this.cardOutput = this.debugOutput();
    }
    /// <summary>
    /// Converts the card into a string representation of the card (ie. c7 = 7 of clubs)
    /// </summary>
    /// <remarks>This is only used for debugging purposes</remarks>
    public debugOutput() : string
    {
      var ret: string = '';

      switch (this.Suit)
      {
        case Suits.Clubs:
          ret = "c";
          break;
        case Suits.Diamonds:
          ret = "d";
          break;
        case Suits.Hearts:
          ret = "h";
          break;
        case Suits.Spade:
          ret = "s";
          break;
      }

      switch (this.Value)
      {
        case 11:
          ret = ret + "J";
          break;
        case 12:
          ret = ret + "Q";
          break;
        case 13:
          ret = ret + "K";
          break;
        case 1:
          ret = ret + "A";
          break;
        default:
          ret = ret + this.Value.toString();
          break;
      }

      return ret;
    }
  }


