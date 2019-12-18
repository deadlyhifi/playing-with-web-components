import { LitElement, html } from "lit-element";

class customHTMLElement extends LitElement {
  render() {
    return html`
      <p>Hello world! From my-custom-component</p>
    `;
  }
}

customElements.define("my-custom-component", customHTMLElement);
