import { Auth, define, Form, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { IUser } from "server/models";

interface MuFormSubmitDetail {
  formData: Record<string, string>; // Example structure, modify as needed
}

interface UserCredentails {
  authenticated: boolean;
  token?: string;
  username?: {
    email: string;
    password: string;
  }
}

export class PennyProfileElement extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property()
  email?: string;

  @property({ type: String, reflect: true })
  mode: string = "view";

  @state()
  avatar?: string | undefined;

  @state()
  user?: IUser;


  get src() {
    return `/api/users/${this.email}`;
  }

  render() {
    const { username, email, nickname, color, avatar, goal } = this.user || {};
    console.log("user", this.user);
    return html`
      <main class="page">
        <section class="view">
          <h1>Hello, ${username}</h1>
          <dl>
            <img src="${avatar}" />
            <dt>Email</dt>
            <dd>${email}</dd>
            <dt>Nickname</dt>
            <dd>${nickname}</dd>
            <dt>Goal</dt>
            <dd>${goal}</dd>
            <dt>color</dt>
            <dd>${color}</dd>
          </dl>
          <button id="edit" @click=${this.handleChangeEdit}>Edit</button>
        </section>
        <mu-form class="edit">
          <label>
            <span>Username</span>
            <input name="username" value=${username} required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" value=${email} required />
          </label>
          <label>
            <span>Nickname</span>
            <input name="nickname" value=${nickname} />
          </label>
          <label>
            <span>Goal</span>
            <input name="goal" value=${goal} />
          </label>
          <label>
            <span>Color</span>
            <input name="color" value=${color} />
          </label>

          <label>
            <span>Avatar</span>
            <input
              type="file"
              name="avatar"
              @change=${this.handleAvatarSelected}
            />
          </label>
        </mu-form>
      </main>
    `;
  }
  handleChangeEdit() {
    this.mode = "edit";
  }

  static styles = [
    css`
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
      h1 {
        grid-row: 2;
        grid-column: auto / span 4;
        text-align: center;
      }
      button {
        grid-column: 3 / span 1;
        justify-self: end;
        width: 100%;
      }
      img {
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
    `,
  ];

  _authObserver = new Observer<Auth.Model>(this, "pennypiggy:auth");
  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }

      this.hydrate(this.src);
      
      this.addEventListener("mu-form:submit", (event: Event) => {
        const customEvent = event as CustomEvent<MuFormSubmitDetail>;

        console.log("users detail", customEvent.detail);
        this.submit(this.src, customEvent.detail as unknown as IUser);
      });
    });
  }

  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user)
    })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        console.log("This user is authenticated")
        return res.json();
      })
      .then((json) => {
        this.user = json as IUser;
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to render data ${url}:`, error);
      });
  }

  submit(url: string, json: IUser) {
    const method = this.mode === "new" ? "POST" : "PUT";

    if (this.avatar) json.avatar = this.avatar;

    console.log("this is the avatar", this.avatar);
    console.log("method", method);
    console.log("Submitting data:", json);
    console.log("Submitting body:", JSON.stringify(json));

    console.log(url, {
      method,
      headers: Auth.headers(this._user),
      body: JSON.stringify(json),
    })

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...Auth.headers(this._user)
      },
      body: JSON.stringify(json),
    })
      .then((res) => {
        if (res.status !== (this.mode === "new" ? 201 : 200))
          throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.user = json;
        console.log("what is this", this)
        console.log("this is user", this.user);
        console.log({ ...json, avatar: "" });
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to submit ${url}:`, error);
      });
  }

  handleAvatarSelected(ev: Event): void {
    const target = ev.target as HTMLInputElement; // Typecast target as HTMLInputElement
    const selectedFile = target.files?.[0]; // Use optional chaining for safety

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const reader = new Promise<string | ArrayBuffer | null>(
      (resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = (err) => reject(err);
        fr.readAsDataURL(selectedFile);
      }
    );

    reader
      .then((result) => {
        this.avatar = result as string | undefined; // Assuming this.avatar exists and accepts these types
      })
      .catch((error) => {
        console.error("Error reading file:", error);
      });
  }
}
