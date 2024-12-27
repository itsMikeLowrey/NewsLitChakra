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
            <div
              class="font-weight-bold container"
              ?hidden=${!this.quizOver}
              style="background-color: #00283A;border-radius: 25px;"
            >
              <div class="d-flex justify-content-center">
                <div class="pt-3 text-white">
                  <h1 class="">Quiz Over</h1>
                </div>
              </div>
              <div class="row justify-content-center my-1">
                <div class="row justify-content-center">
                  <div class="col-12">
                    <h3 class="p-3 text-white text-center">
                      Your Score: ${this.score}%
                    </h3>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-12">
                    <h3 class="p-3 text-white text-center">
                      Average Score: ${averageScore}%
                    </h3>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="text-white">
                    <h2 class="p-3">
                      You Can Sharpen Your Rumor Detection Skills
                      <a
                        href="https://www.rumorguard.org/factors"
                        target="_blank"
                        rel="noopener noreferrer"
                        >here.</a
                      >
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              ?hidden=${this.items && this.quizOver}
              class=""
              style="background-color: #00283A;border-radius: 25px;"
            >
              <div class="container">
                <div class="d-flex justify-content-center">
                  <div
                    class="pt-3 text-white font-weight-bold "
                    style="font-size: 2.5em;"
                  >
                    <p class="" ?hidden=${this.quizOver}>Rumor Quiz</p>
                  </div>
                </div>
              </div>
              <div class="container px-4 rounded">
                <div class="row">
                  <div class="col">
                    <img
                      src="${this.items[this.count].image}"
                      class="rounded"
                    />
                  </div>
                  <div class="col">
                    <div
                      class="d-flex align-items-center justify-content-center h-100"
                    >
                      <div>
                        <h5 class="p-0 m-0 text-white">
                          ${this.convertEpochToDate(
                            this.items[this.count].date,
                          )}
                        </h5>
                        <h3 class="p-0 m-0 text-white">Question# ${this.count + 1}:</h3>
                        <p style="font-size: 1.5em" class="mt-3 text-white">
                          ${this.items[this.count].question}
                        </p>
                        <div class="d-flex justify-content-center">
                          <button
                            ?hidden=${this.answerShowing}
                            type="button"
                            class="btn btn-success mx-2"
                            @click=${() => this.answerQuestion(true)}
                          >
                            True
                          </button>
                          <button
                            ?hidden=${this.answerShowing}
                            type="button"
                            class="btn btn-danger mx-2"
                            @click=${() => this.answerQuestion(false)}
                          >
                            False
                          </button>
                        </div>

                        <div ?hidden=${!this.answerShowing}>
                          <div class="container mt-1">
                            <div class="row">
                              <h3 class="p-0 text-white">
                                This Rumor is:
                                ${this.items[this.count].answer
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase() +
                                this.items[this.count].answer
                                  .toString()
                                  .slice(1)}
                              </h3>
                            </div>
                            <div class="row mt-1 justify-content-center">
                              <div class="p-0">
                                <button
                                  type="button"
                                  class="btn btn-secondary mx-2"
                                  @click=${() => this.nextQuestion()}
                                >
                                  Next Question
                                </button>
                              </div>
                            </div>
                            <div class="row mt-3">
                              <div class="p-0  text-white">
                                More Info:
                                <a
                                  href=${this.items[this.count].article}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  >${this.items[this.count].article}</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center my-3">
                  <div class="row justify-content-center">
                    <div class="col-12">
                      <h3 class="p-3 text-white text-center">
                        Your Score: ${this.score}%
                      </h3>
                    </div>
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-12">
                      <h3 class="p-3 text-white text-center">
                        Average Score: ${averageScore}%
                      </h3>
                    </div>
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
