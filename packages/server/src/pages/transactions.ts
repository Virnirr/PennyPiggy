import { css, html, HtmlString } from "@calpoly/mustang/server";
import { ITransactions } from "models/transactions";
import renderPage from "./renderPage";

export class TransactionPage {
  data: ITransactions[];
  
  constructor(data: ITransactions[]) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
    });
  }

  renderTransactionHistory(transactions: ITransactions[]) {

    const headers = Object.keys(transactions[0]).map(header => {
      if (["description", "amount", "date", "sourceAccount", "destinationAccount", "category"].includes(header)) {
        return html`
          <div class="cell">${header.substring(0, 1).toUpperCase() + header.substring(1)}</div>
        `;
      }
      else {
        return html``;
      }
    });

    const rowData = transactions.map(transaction => {
      const { description, amount, date, sourceAccount, destinationAccount, category } = transaction;
      
      const { accountName: sourceAccountName } = sourceAccount;
      const { accountName: destinationAccountName } = destinationAccount;
      const { description: categoryName } = category;

      const strAmount = "$" + amount.toFixed(2);

      return html`
        <div slot="data" class="table-row">
          <div class="cell">${description}</div>
          <div class="cell">${strAmount}</div>
          <div class="cell">${date.toDateString()}</div>
          <div class="cell">${sourceAccountName}</div>
          <div class="cell">${destinationAccountName}</div>
          <div class="cell">${categoryName}</div>
        </div>
      `
    });

    return html`
      <table-element class="transactions-history">
        <!-- Header Row -->
        <div slot="header" class="table-row header">
          ${headers}
        </div>
      
        <!-- Data Rows -->
        ${rowData}
      </table-element>
    `
  }

  renderBody() {
    const transactions = this.renderTransactionHistory(this.data);


    return html`
      <body>
        <nav-bar></nav-bar>
        <main class="transactions">
          <section class="transactions-graph">Some Graph</section>
          <section class="transactions-graph">Some Graph</section>
          <section class="transactions-graph">Some Graph</section>

          ${transactions}
          
          <section>

            <history-element>
              <history-card date="July 24, 2023" transactions="5" spent="$120"></history-card>
              <history-card date="July 25, 2023" transactions="3" spent="$80"></history-card>
              <history-card date="July 26, 2023" transactions="4" spent="$100"></history-card>
              <history-card date="July 27, 2023" transactions="2" spent="$50"></history-card>
              <history-card date="July 28, 2023" transactions="6" spent="$150"></history-card>
              <history-card date="July 29, 2023" transactions="1" spent="$30"></history-card>
              <history-card date="July 30, 2023" transactions="7" spent="$200"></history-card>
            </history-element>
            
          </section>
        </main>
        <footer>
          <p>&copy; 2024 PennyPiggy</p>
        </footer>
        <script src="scripts/events.js" defer></script>
      </body>
    `
  }
}