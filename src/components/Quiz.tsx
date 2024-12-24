import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

interface Item {
  image: string;
  date: number;
  question: string;
  answer: boolean;
  article: string;
}
const averageScore = 50;

export class MyLitComponent extends LitElement {
  @property({ type: Array })
  items: null | Item[] = [
    { image: "", date: 0, question: "", answer: false, article: "" },
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
  static styles = css`
    img {
      width: 100%;
    }
  `;

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
      />
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
        crossorigin="anonymous"
      ></script>
      ${this.items === null
        ? html`<p>Loading...</p>`
        : html`
            <div class='bg-success' ?hidden=${!this.quizOver}>Quiz Over!</div>
            <div ?hidden=${this.items && this.quizOver}>
              <div class="container p-4 rounded">
                <div class="row">
                  <div class="col">
                    <img
                      src="${this.items[this.count].image}"
                      class="rounded"
                    />
                  </div>
                  <div class="col bg-dark ">
                    <div
                      class="d-flex align-items-center justify-content-center h-100"
                    >
                      <div>
                        <p>
                          ${this.convertEpochToDate(
                            this.items[this.count].date,
                          )}
                        </p>
                        <p>Question# ${this.count + 1}:</p>
                        <p>${this.items[this.count].question}</p>

                        <button
                          ?hidden=${!this.answerShowing}
                          type="button"
                          class="btn btn-info"
                          @click=${() => this.nextQuestion()}
                        >
                          Next Question
                        </button>
                        <button
                          ?hidden=${this.answerShowing}
                          type="button"
                          class="btn btn-success"
                          @click=${() => this.answerQuestion(true)}
                        >
                          True
                        </button>
                        <button
                          ?hidden=${this.answerShowing}
                          type="button"
                          class="btn btn-danger"
                          @click=${() => this.answerQuestion(false)}
                        >
                          False
                        </button>
                        <div ?hidden=${!this.answerShowing}>
                          ${this.items[this.count].article}
                        </div>
                        <div ?hidden=${!this.answerShowing}>
                          ${this.items[this.count].answer}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row bg-dark">
                  <div class="col">
                    <div ?hidden=${!this.quizOver}>Quiz Over</div>
                    <div>Your Score: ${this.score}%</div>
                    <div>Average Score: ${averageScore}%</div>
                  </div>
                </div>
              </div>
            </div>
          `}
    `;
  }
  convertEpochToDate(epochTime: number) {
    const date = new Date(epochTime);
    return (
      date.getUTCDate() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCFullYear()
    );
  }
  nextQuestion() {
    if (this.items === null) {
      return;
    }
    if (this.items.length === this.count + 1) {
      this.quizOver = true;
      return;
    }
    this.answerShowing = false;
    this.count += 1;
  }
  answerQuestion(answer: boolean) {
    if (this.items === null) {
      return;
    }
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
