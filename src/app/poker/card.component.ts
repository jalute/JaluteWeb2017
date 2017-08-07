import {Component, Input, OnChanges} from "@angular/core";
import {Card, Suits, CardValues} from "./card";

@Component({
  selector: 'ai-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})

export class CardComponent implements OnChanges {
  @Input() card: Card;
  valueOutput: string;
  suitOutput: string;


  ngOnChanges(): void {
    //var cardSuits = {Spade: '♠', Hearts: '♥', Diamonds: '♦', Clubs: '♣'};
    switch (this.card.Suit)
    {
      case Suits.Clubs:
        this.suitOutput = '♣';
        break;
      case Suits.Diamonds:
        this.suitOutput = '♦';
        break;
      case Suits.Hearts:
        this.suitOutput = '♥';
        break;
      case Suits.Spade:
        this.suitOutput = '♠';
        break;
    }

    switch (this.card.Value)
    {
      case 11:
        this.valueOutput = "J";
        break;
      case 12:
        this.valueOutput = "Q";
        break;
      case 13:
        this.valueOutput = "K";
        break;
      case 1:
        this.valueOutput = "A";
        break;
      default:
        this.valueOutput = '' + this.card.Value;
        break;
    }
  }

  onCardClick(card: Card): void {
    if (card.hold == 'HOLD')
      card.hold = '';
    else
      card.hold = 'HOLD';
  }
}
