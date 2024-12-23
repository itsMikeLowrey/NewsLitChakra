// my-lit-component.js
import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js';

class MyLitComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: black;
      border-radius: 8px;
    }
  `;
  @property({ type: String })
  name: string = 'World';
  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

customElements.define('my-lit-component', MyLitComponent);
