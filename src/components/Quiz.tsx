import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';

interface Item {
  picture: string;
  date: number;
  question: string;
  answer: boolean;
  article: string;
}
const averageScore = 50;

export class MyLitComponent extends LitElement {
  @property({ type: Array })
  items: Item[] = [
    { picture: "", date: 0, question: "", answer: false, article: "" },
  ];
  @state()
  private count: number = 0;
  @state()
  private answerShowing: boolean = false;
  @state()
  private quizOver: boolean = false;
  @state()
  private numberCorrect: number = 0;
  @state()
  private score: number = 0;

  render() {
    return html`
    <div ?hidden=${this.quizOver}>
      <div class="item">
        <div class="item-title">Question#${this.count + 1}:</div>
        <div>${this.items[this.count].date}</div>
        <img src="${this.items[this.count].picture}" alt="Girl in a jacket" width="500" height="600">
        <div></div>
        <div>${this.items[this.count].question}</div>
        <div ?hidden=${!this.answerShowing}>
          ${this.items[this.count].article}
        </div>
        <div ?hidden=${!this.answerShowing}>
          ${this.items[this.count].answer}
        </div>
      </div>
      <button
        ?hidden=${!this.answerShowing}
        class="button"
        @click=${() => this.nextQuestion()}
      >
        Next Question
      </button>
      <button
        ?hidden=${this.answerShowing}
        class="button"
        @click=${() => this.answerQuestion(true)}
      >
        True
      </button>
      <button
        ?hidden=${this.answerShowing}
        class="button"
        @click=${() => this.answerQuestion(false)}
      >
        False
      </button>
      </div>
      </div>
      <div ?hidden=${!this.quizOver}>
      Quiz Over
      </div>
      <div >Your Score: ${this.score}%</div>
      <div >Average Score: ${averageScore}%</div>
      <sl-button>Click me</sl-button>

    `;
  }

  nextQuestion() {
    if (this.items.length === this.count + 1) {
      this.quizOver = true;
      return;
    }
    this.answerShowing = false;
    this.count += 1;
  }
  answerQuestion(answer: boolean) {
    if (answer === this.items[this.count].answer) {
      this.numberCorrect += 1;
    }
    this.answerShowing = true;
    this.setSCore(this.numberCorrect, this.count + 1);
  }
  setSCore(numberCorrect: number, questionNumber: number) {
    this.score = parseFloat(
      ((numberCorrect / questionNumber) * 100).toFixed(0),
    );
  }
}

// Register the custom element
customElements.define("my-lit-component", MyLitComponent);
