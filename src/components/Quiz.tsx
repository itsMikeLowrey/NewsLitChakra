import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
interface Item {
  picture: string;
  date: number;
  question: string;
  answer: boolean;
}

export class MyLitComponent extends LitElement {
  @property({ type: Array })
  items: Item[] = [{ picture: "", date: 0, question: "", answer: false }];
  @state()
  private count: number = 0;

  render() {
    return html`
      <div class="item">
        <div class="item-title">Question#${this.count + 1}:</div>
        <div>${this.items[this.count].date}</div>
        <div>${this.items[this.count].picture}</div>
        <div>${this.items[this.count].question}</div>
        <div>${this.items[this.count].answer}</div>
      </div>
    `;
  }
}

// Register the custom element
customElements.define("my-lit-component", MyLitComponent);
