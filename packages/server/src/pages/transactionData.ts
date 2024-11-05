// Assuming Currency is defined as a number for simplicity
import { IAssetAccount } from "models/assetAccount";
import { IExpenseAccount } from "models/expenseAccount";
import { IUser } from "models/users";
import { ITransactions } from "models/transactions";
import { ICategory } from "models/transactions";

type Currency = number;

// Sample Users
const users: IUser[] = [
  {
    userid: 'user1',
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    avatar: 'john_avatar.png',
  },
  {
    userid: 'user2',
    username: 'JaneSmith',
    email: 'janesmith@example.com',
  },
];

// Sample Asset Accounts
const assetAccounts: IAssetAccount[] = [
  {
    accountName: 'Checking Account',
    role: 'personal',
    accountNumber: 123456789,
    currentBalance: 5000.0,
    isActive: true,
    lastActivity: new Date('2023-10-01'),
  },
  {
    accountName: 'Business Account',
    role: 'business',
    accountNumber: 987654321,
    currentBalance: 20000.0,
    isActive: true,
    lastActivity: new Date('2023-10-02'),
  },
];

// Sample Expense Accounts
const expenseAccounts: IExpenseAccount[] = [
  {
    accountName: 'Credit Card',
    accountNumber: 555555555,
    currentBalance: -1500.0,
    isActive: true,
    lastActivity: new Date('2023-10-03'),
  },
  {
    accountName: 'Loan Account',
    accountNumber: 444444444,
    currentBalance: -10000.0,
    isActive: false,
    lastActivity: new Date('2023-09-15'),
  },
];

// Sample Categories
const categories: ICategory[] = [
  {
    categoryId: 1,
    description: 'Salary',
  },
  {
    categoryId: 2,
    description: 'Groceries',
  },
  {
    categoryId: 3,
    description: 'Utilities',
  },
];

// Sample Transactions
export const TransactionsData: ITransactions[] = [
  {
    transactionId: 1,
    userId: users[0],
    transactionType: 'deposit',
    description: 'Monthly Salary',
    amount: 3000.0,
    date: new Date('2023-10-05'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'salary'],
    notes: 'October salary deposit',
  },
  {
    transactionId: 2,
    userId: users[0],
    transactionType: 'withdrawal',
    description: 'Grocery Shopping',
    amount: -150.0,
    date: new Date('2023-10-06'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[1],
    tags: ['expense', 'groceries'],
    notes: 'Bought groceries from supermarket',
  },
  {
    transactionId: 3,
    userId: users[1],
    transactionType: 'transfer',
    description: 'Business Investment',
    amount: -5000.0,
    date: new Date('2023-10-07'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[1],
    category: categories[2],
    tags: ['investment', 'business'],
    notes: 'Invested in new project',
  },
  {
    transactionId: 4,
    userId: users[1],
    transactionType: 'deposit',
    description: 'Freelance Payment',
    amount: 1200.0,
    date: new Date('2023-10-08'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'freelance'],
    notes: 'Payment from client',
  },
];
