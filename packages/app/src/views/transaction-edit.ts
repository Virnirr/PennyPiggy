import { define, Form, InputArray, View, History } from "@calpoly/mustang";
import { css, html, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { IUser, ITransactions, IAssetAccount, IExpenseAccount, ICategory} from "server/models";
import { Model } from "../model";
import { Msg } from "../messages";
import reset from "../style/reset.css.ts";
import page from "../style/page.css.ts";

function isAssetAccount(account: any): account is IAssetAccount {
  return (
    account && typeof account.accountName === "string" /* && any other checks */
  );
}

function isExpenseAccount(account: any): account is IExpenseAccount {
  return (
    account && typeof account.accountName === "string" /* && any other checks */
  );
}

function isCategory(account: any): account is ICategory {
  return (
    account && typeof account.description === "string" /* && any other checks */
  );
}

export class TransactionEditView extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  @property()
  email?: string;

  @state()
  get transactions(): ITransactions[] | undefined {
    return this.model.transactions;
  }

  @state()
  get assetAccounts(): string[] {
    if (!this.model.transactions) return [];
    const assetAccountFIlter =  this.model.transactions.map((transaction) => {
      if (isAssetAccount(transaction.sourceAccount)) {
        return transaction.sourceAccount.accountName;
      }
      return "";
    });
    return [...new Set(assetAccountFIlter)];
  }

  @state()
  get expenseAccounts(): string[] {
    if (!this.model.transactions) return [];
    const expenseAccountFilters = this.model.transactions.map((transaction) => {
      if (isExpenseAccount(transaction.destinationAccount)) {
        return transaction.destinationAccount.accountName;
      }
      return "";
    });
    return [...new Set(expenseAccountFilters)];
  }

  @state()
  get categories(): string[] {
    if (!this.model.transactions) return [];
    const categoryFilters = this.model.transactions.map((transaction) => {
      if (isCategory(transaction.category)) {
        return transaction.category.description;
      }
      return "";
    });
    return [...new Set(categoryFilters)];
  }

  render() {

    console.log("expenseAccounts", this.expenseAccounts);
    console.log("assetAccounts", this.assetAccounts);
    return html` <main class="page">
      <mu-form @mu-form:submit=${this._handleSubmit}>
        <!-- Form inputs -->
        <label>
          <label>
            <span>Description</span>
            <input name="description" required/>
          </label>
          <label>
            <span>Transaction Type</span>
            <select name="transactionType">
            <option disabled selected value> -- select an option -- </option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
          </label>
          <label>
            <span>Source Account</span>
            <select name="sourceAccount" default="">
            <option disabled selected value> -- select an option -- </option>
              ${this.assetAccounts.map((account) => html`<option value=${account}>${account}</option>`)}
            </select>
          </label>
          <label>
            <span>Destination Account</span>
            <select name="destinationAccount" default="">
            <option disabled selected value> -- select an option -- </option>
              ${this.expenseAccounts.map((account) => html`<option value=${account}>${account}</option>`)}
            </select>
          </label>
          <label>
            <span>Category</span>
            <select name="category">
              <option disabled selected value> -- select an option -- </option>
              ${this.categories.map((account) => html`<option value=${account}>${account}</option>`)}
            </select>
          </label>
          <label>
            <span>Amount</span>
            <input name="amount" type=number min=0 required />
          </label>
          <label>
            <span>Tags (note for multiple tags, seprate it with spaces)</span>
            <input name="tags" />
          </label>
          <label>
            <span>Notes</span>
            <textarea name="notes" rows="4" cols="50">
            </textarea>
          </label>
      </mu-form>
    </main>`;
  }

  static styles = [
    reset.styles,
    css`
      mu-form {
        grid-template-columns: repeat(1, 1fr);
        grid-column: 1 / 2;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `
  ];

  constructor() {
    super("pennypiggy:model");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "email" && oldValue !== newValue && newValue) {
      console.log("Message is dispatched");
      this.dispatchMessage([
        "transactions/select",
        {
          email: this.email as string,
          onSuccess: () => {
            console.log("Success");
          },
          onFailure: (err: Error) => {
            console.log(err);
          },
        },
      ]);
    }
  }

  _handleSubmit(event: Form.SubmitEvent<ITransactions>) {
    console.log("this is the event", event.detail);
    this.dispatchMessage([
      "transactions/save",
      {
        email: this.email as string,
        transactions: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/transactions/${this.email}`,
          }),
        onFailure: (error: Error) => console.log("ERROR:", error),
      },
    ]);
  }
}
