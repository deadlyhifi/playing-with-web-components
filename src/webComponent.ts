import { LitElement, html, property } from "lit-element";

import { classMap } from "lit-html/directives/class-map";
import { styleMap } from "lit-html/directives/style-map";
import { globalStyles } from "./style/global";
import { buttonStyles } from "./style/button";

enum ButtonLabel {
  Enable = "Enable",
  Disable = "Disable"
}

class customHTMLElement extends LitElement {
  @property({ type: String }) text = "Hello World";
  @property({ type: ButtonLabel }) buttonLabel = ButtonLabel.Disable;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Object }) classes = {
    card: true,
    highlighted: this.disabled
  };
  @property({ type: Object }) styles = { fontFamily: "Roboto" };

  static get styles() {
    return [globalStyles, buttonStyles];
  }

  clickHandler(event: Event) {
    event.preventDefault();
    this.disabled = !this.disabled;
    this.buttonLabel = this.disabled ? ButtonLabel.Enable : ButtonLabel.Disable;
    this.classes = { ...this.classes, highlighted: this.disabled };
  }

  render() {
    return html`
      <p>Hello world! From my-custom-component</p>
      <p>${this.text}</p>
      <input type="text" ?disabled="${this.disabled}" />
      <button @click="${this.clickHandler}">${this.buttonLabel}</button>
      <slot></slot>
      <slot name="named"></slot>
      <div class=${classMap(this.classes)} style=${styleMap(this.styles)}>
        Some content
      </div>
    `;
  }
}

customElements.define("my-custom-component", customHTMLElement);
