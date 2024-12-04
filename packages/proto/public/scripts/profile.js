import {
  css,
  define,
  html,
  shadow,
  Form,
  InputArray,
  Observer
} from "@calpoly/mustang";

export class PennyProfileElement extends HTMLElement {

  static uses = define({
    "mu-form": Form.Element,
  });


  static template = html`
  <template>
    <section class="view">
      <h1>Hello, <slot name="username"></slot></h1>
      <dl>
        <slot name="avatar"></slot>
        <dt>Email</dt>
        <dd><slot name="email"></slot></dd>
        <dt>Nickname</dt>
        <dd><slot name="nickname"></slot></dd>
        <dt>Goal</dt>
        <dd><slot name="goal"></slot></dd>
        <dt>color</dt>
        <dd><slot name="color"></slot></dd>
      </dl>
      <button id="edit">Edit</button>
    </section>
    <mu-form class="edit">
      <label>
        <span>Username</span>
        <input name="username" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required />
      </label>
      <label>
        <span>Nickname</span>
        <input name="nickname" />
      </label>
      <label>
        <span>Email</span>
        <input name="goal" />
      </label>
      <label>
        <span>Email</span>
        <input name="color" />
      </label>

      <label>
        <span>Avatar</span>
        <input type="file" name="avatar" />
      </label>
    </mu-form>
  </template>`;


  static styles = css`
    :host {
      display: contents;
    }
    :host([mode="edit"]),
    :host([mode="new"]) {
      --display-view-none: none;
    }
    :host([mode="view"]) {
      --display-editor-none: none;
    }
    section.view {
      display: var(--display-view-none, grid);
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    h1{
      grid-row: 2;
      grid-column: auto / span 4;
      text-align: center;
    }
    button {
      grid-column: 3 / span 1;
      justify-self: end;
      width: 100%;
    }
    ::slotted([slot="avatar"]) {
      grid-column: 2 / span 2;
      justify-self: end;
      width: 45%;
      height: auto;
      border-radius: 50%;
    }
    dl {
      display: grid;
      grid-column: 1 / span 4;
      grid-row: 5 / auto;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
      margin-top: var(--size-spacing-medium);
    }
    dt {
      grid-column: 1 / span 2;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: 3 / -1;
    }
    mu-form.edit {
      display: var(--display-editor-none, grid);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(PennyProfileElement.template)
      .styles(
        PennyProfileElement.styles
      );

      this.editButton.addEventListener(
        "click",
        () => (this.mode = "edit")
      );
      
      this.avatarInput.addEventListener("change", (event) =>
        this.handleAvatarSelected(event)
      );
  
      this.addEventListener("mu-form:submit", (event) =>
        this.submit(this.src, event.detail)
      );
  }

  get src() {
    return this.getAttribute("src");
  }

  get mode() {
    return this.getAttribute("mode");
  }

  set mode(m) {
    this.setAttribute("mode", m);
  }

  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
  }

  get avatarInput() {
    return this.shadowRoot.querySelector('input[type="file"]');
  }

  get editButton() {
    return this.shadowRoot.getElementById("edit");
  }

  _authObserver = new Observer(this, "pennypiggy:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Authenticated user:", user);
      this._user = user;
      if (this.src && this.mode !== "new") this.hydrate(this.src);
    });
  }
  
  static observedAttributes = ["src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (
      name === "src" &&
      oldValue !== newValue &&
      oldValue &&
      newValue &&
      this.mode !== "new"
    )
      this.hydrate(newValue);
  }


  hydrate(url) {
    console.log()
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        console.log("Hydrating data:", json);
        this.renderSlots(json);
        this.form.init = json;
      })
      .catch((error) => {
        console.log(`Failed to render data ${url}:`, error);
      });
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    console.log("Rendering slots:", entries);

    const toSlot = ([key, value]) => {
      switch (key) {
        case "avatar":
          return html`<img slot="${key}" src="${value}" />`;
        case "username":
        case "email":
        case "color":
        case "goal":
        case "nickname":
          return html`<span slot="${key}">${value}</span>`;
        default:
          return null; // Handle any unexpected keys gracefully
      }
    };

    const fragment = entries.map(toSlot);

    console.log("Rendering slots:", fragment);
    this.replaceChildren(...fragment);
  }

  get authorization() {
    console.log("Authorization for user, ", this._user);
    if (this._user && this._user.authenticated)
      return {
        Authorization: `Bearer ${this._user.token}`
      };
    else return {};
  }

  submit(url, json) {
    const method = this.mode === "new" ? "POST" : "PUT";

    if (this.avatar) json.avatar = this.avatar;

    console.log("this is the avatar", this.avatar);

    console.log("Submitting data:", json);
  
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      body: JSON.stringify(json)
    })
      .then((res) => {
        if (res.status !== (this.mode === "new" ? 201 : 200))
          throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        console.log({ ...json, avatar: "",})
        this.form.init = {...json, avatar: ""};
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to submit ${url}:`, error);
      });
    }

    handleAvatarSelected(ev) {
      const target = ev.target;
      const selectedFile = target.files[0];

      const reader = new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = (err) => reject(err);
        fr.readAsDataURL(selectedFile);
      });

      reader.then((result) => (this.avatar = result));
    }
}