import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
interface Item {
  picture: string;
  date: number;
  question: string;
  answer: boolean;
  article: string;
}

export class MyLitComponent extends LitElement {
  @property({ type: Array })
  items: Item[] = [{ picture: "", date: 0, question: "", answer: false, article: '' }];
  @state()
  private count: number = 0;
  @state()
  private answerShowing: boolean = false;

  render() {
    return html`
      <div class="item">
        <div class="item-title">Question#${this.count + 1}:</div>
        <div>${this.items[this.count].date}</div>
        <div>${this.items[this.count].picture}</div>
        <div>${this.items[this.count].question}</div>
        <div ?hidden=${!this.answerShowing}>${this.items[this.count].article}</div>
        <div ?hidden=${!this.answerShowing}>${this.items[this.count].answer}</div>
      </div>
      <button ?hidden=${!this.answerShowing} class="button" @click=${() => this.nextQuestion()}>Next Question</button>
      <button ?hidden=${this.answerShowing} class="button" @click=${() => this.answerQuestion(true)}>True</button>
      <button ?hidden=${this.answerShowing} class="button" @click=${() => this.answerQuestion(false)}>False</button>
    `;
  }

  nextQuestion() {
    if (this.items.length === this.count + 1 ) {
      return
    }
    this.answerShowing = false;
    this.count = this.count + 1;
  }
  answerQuestion(answer: boolean) {
    console.log(answer)
    this.answerShowing = true;
  }
}

// Register the custom element
customElements.define("my-lit-component", MyLitComponent);
