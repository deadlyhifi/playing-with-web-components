import { LitElement, html, property, css, customElement } from "lit-element";

import { classMap } from "lit-html/directives/class-map";
import { styleMap } from "lit-html/directives/style-map";
import { globalStyles } from "./style/global";
import { buttonStyles } from "./style/button";

enum ButtonLabel {
  Enable = "Enable",
  Disable = "Disable"
}

@customElement("my-custom-component")
class customHTMLElement extends LitElement {
  @property({ type: String }) text = "Hello World";
  @property({ type: ButtonLabel }) buttonLabel = ButtonLabel.Disable;
  @property({ type: Boolean }) buttonEnabled = false;
  @property({ type: Object }) classes = {
    card: true,
    highlighted: this.buttonEnabled
  };
  @property({ type: Object }) styles = { fontFamily: "Roboto" };
  // public text: String;
  // public buttonLabel: ButtonLabel;
  // public buttonEnabled: Boolean;
  // public classes: Object;
  // public styles: Object;

  // static get properties() {
  //   return {
  //     text: { type: String },
  //     buttonLabel: { type: ButtonLabel },
  //     buttonEnabled: { type: Boolean },
  //     classes: { type: Object },
  //     styles: { type: Object }
  //   };
  // }

  // constructor() {
  //   super();
  //   this.text = "Hello World";
  //   this.buttonLabel = ButtonLabel.Disable;
  //   this.buttonEnabled = false;
  //   this.classes = {
  //     card: true,
  //     highlighted: this.buttonEnabled
  //   };
  //   this.styles = { fontFamily: "Roboto" };
  // }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          border-radius: 2em;
          padding: 20px;
          border: 10px solid #bada55;
          color: var(--themeColor);
        }
        .named {
          border: 1px solid grey;
        }
      `,
      globalStyles,
      buttonStyles
    ];
  }

  enableButtonClickHandler(event: Event) {
    event.preventDefault();
    this.buttonEnabled = !this.buttonEnabled;
    this.buttonLabel = this.buttonEnabled
      ? ButtonLabel.Enable
      : ButtonLabel.Disable;
    this.classes = { ...this.classes, highlighted: this.buttonEnabled };
  }

  sendEventClickHandler(event: Event) {
    const myEvent = new CustomEvent("my-event", {
      detail: { message: event },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  render() {
    return html`
      <p>Hello world! From my-custom-component</p>
      <p>${this.text}</p>
      <input type="text" ?disabled="${this.buttonEnabled}" />
      <button @click="${this.enableButtonClickHandler}">
        ${this.buttonLabel}
      </button>
      <slot></slot>
      <div class="named">
        <slot name="named"></slot>
      </div>
      <div class=${classMap(this.classes)} style=${styleMap(this.styles)}>
        Some content
      </div>
      <button @click="${this.sendEventClickHandler}">Send an event</button>
    `;
  }
}

// customElements.define("my-custom-component", customHTMLElement);
