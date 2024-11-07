import { css, html, HtmlString } from "@calpoly/mustang/server";
import { ITransactions } from "models/ITransactions";
import renderPage from "./renderPage";
import { IAssetAccount } from "models";
import { IExpenseAccount } from "models";
import { ICategory } from "models";
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


    const headers = ["Description", "Amount", "Date", "SourceAccount", "DestinationAccount", "Category"].map(header => {
      return html`
        <div class="cell">${header}</div>
      `
    })

    const rowData = transactions.map(transaction => {
      const { description, amount, date, sourceAccount, destinationAccount, category } = transaction;
      
      const { accountName : sourceAccountName } = sourceAccount as IAssetAccount;
      const { accountName: destinationAccountName } = destinationAccount as IExpenseAccount;
      const { description: categoryName } = category as ICategory;

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

  renderHistory() {

    interface IHistoryGroup extends Object{
      date: string,
      transactions: number,
      spent: number
    }

    console.log(this.data)

    // Group by dates and calculate total spent. Load them into an object to be parsed and create history cards
    const historyGroupByDate = this.data.reduce((acc: Record<string, IHistoryGroup>, transaction: ITransactions) => {

      // Extract date and amount from transaction
      const { date, amount } = transaction;
      
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${month}/${year}`;

      if (!acc[key]) {
        acc[key] = {
          date: key,
          transactions: 1,
          spent: amount
        }
      } else {
        acc[key] = {
          ...acc[key],
          transactions: acc[key].transactions + 1,
          spent: acc[key].spent + amount
        }
      }
      return acc;
    }, {});

    const sortedHistoryKey = Object.keys(historyGroupByDate).sort((a, b) => {
      const [aMonth, aYear] = a.split('/').map(Number);
      const [bMonth, bYear] = b.split('/').map(Number);
      const aDate = new Date(aYear, aMonth - 1).getTime(); // month is 0-indexed
      const bDate = new Date(bYear, bMonth - 1).getTime();
      return bDate - aDate;
    })

    const historyElements = sortedHistoryKey.map(key => {
      const { date, transactions, spent } = historyGroupByDate[key];
      return html`
        <history-card date="${date}" transactions="${transactions}" spent="$${spent.toFixed(2)}"></history-card>
      `
    });

    return html`
      <history-element>
        ${historyElements}
      </history-element>
    `;
  }

  renderBody() {
    const transactions = this.renderTransactionHistory(this.data);
    const historyElement = this.renderHistory();


    return html`
      <body>
        <nav-bar></nav-bar>
        <main class="transactions">
          <section class="transactions-graph">Some Graph</section>
          <section class="transactions-graph">Some Graph</section>
          <section class="transactions-graph">Some Graph</section>

          ${transactions}
          
          <section>

          ${historyElement}
            
          </section>
        </main>
        <footer>
          <p>&copy; 2024 PennyPiggy</p>
        </footer>
      </body>
    `
  }
}