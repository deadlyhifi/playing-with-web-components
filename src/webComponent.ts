import { LitElement, html, property } from "lit-element";

enum ButtonLabel {
  Enable = "Enable",
  Disable = "Disable"
}

class customHTMLElement extends LitElement {
  @property({ type: String }) text = "Hello World";
  @property({ type: ButtonLabel }) buttonLabel = ButtonLabel.Enable;
  @property({ type: Boolean }) disabled = false;

  clickHandler(event: Event) {
    event.preventDefault();
    this.disabled = !this.disabled;
    this.buttonLabel = this.disabled ? ButtonLabel.Enable : ButtonLabel.Disable;
  }

  render() {
    return html`
      <p>Hello world! From my-custom-component</p>
      <p>${this.text}</p>
      <input type="text" ?disabled="${this.disabled}" />
      <button @click="${this.clickHandler}">${this.buttonLabel}</button>
      <slot></slot>
      <slot name="named"></slot>
    `;
  }
}

customElements.define("my-custom-component", customHTMLElement);
