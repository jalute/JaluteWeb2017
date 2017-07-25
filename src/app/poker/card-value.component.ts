import {Component, Input, OnChanges} from "@angular/core";
import {CardValues} from "./card";

@Component({
  selector: 'ai-card-value',
  templateUrl: 'card-value.component.html'
})

export class CardValueComponent implements OnChanges {
  @Input() cardValue: CardValues;
  valueOutput: string;

  ngOnChanges(): void {
    switch (this.cardValue)
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
        this.valueOutput = '' + this.cardValue;
        break;
    }
  }
}
