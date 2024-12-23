import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class MyLitComponent extends LitElement {
  // Define `items` as a reactive property
  @property({ type: Array })
  items: string[] = []; // Default value

  render() {
    return html`
      <ul>
        ${this.items.map(item => html`<li>${item}</li>`)}
      </ul>
    `;
  }
}

// Register the custom element
customElements.define('my-lit-component', MyLitComponent);