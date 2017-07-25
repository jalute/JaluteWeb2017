import {Component, Input, OnChanges} from "@angular/core";
import {Suits} from "./card";

@Component({
  selector: 'ai-suit',
  templateUrl: 'suit.component.html'
})

export class SuitComponent implements OnChanges {
  @Input() suit: Suits;
  suitOutput: string;

  ngOnChanges(): void {
    //var cardSuits = {Spade: '♠', Hearts: '♥', Diamonds: '♦', Clubs: '♣'};
    switch (this.suit)
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
  }
}
