// Assuming Currency is defined as a number for simplicity
import { IAssetAccount } from "models/IAssetAccount";
import { IExpenseAccount } from "models/IExpenseAccount";
import { IUser } from "models/IUsers";
import { ITransactions } from "models/ITransactions";
import { ICategory } from "models/ITransactions";

type Currency = number;

// Sample Users
const users: IUser[] = [
  {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    avatar: 'john_avatar.png',
  },
  {
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
    description: 'Salary',
  },
  {
    description: 'Groceries',
  },
  {
    description: 'Utilities',
  },
];

// Sample Transactions
export const TransactionsData: ITransactions[] = [
  {
    user: users[0],
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
    user: users[0],
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
    user: users[1],
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
    user: users[1],
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
    {
    user: users[1],
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
  {
    user: users[0],
    transactionType: 'withdrawal',
    description: 'Utility Bill Payment',
    amount: -200.0,
    date: new Date('2023-01-15'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[1],
    category: categories[2],
    tags: ['expense', 'utilities'],
    notes: 'Paid electricity bill',
  },
  {
    user: users[1],
    transactionType: 'deposit',
    description: 'Project Bonus',
    amount: 2500.0,
    date: new Date('2023-02-20'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'bonus'],
    notes: 'Received bonus for project completion',
  },
  {
    user: users[0],
    transactionType: 'withdrawal',
    description: 'Grocery Shopping',
    amount: -300.0,
    date: new Date('2023-03-10'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[1],
    tags: ['expense', 'groceries'],
    notes: 'Weekly grocery shopping',
  },
  {
    user: users[1],
    transactionType: 'transfer',
    description: 'Loan Repayment',
    amount: -1000.0,
    date: new Date('2023-04-05'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[1],
    category: categories[2],
    tags: ['expense', 'loan'],
    notes: 'Monthly loan repayment',
  },
  {
    user: users[0],
    transactionType: 'deposit',
    description: 'Freelance Work',
    amount: 1800.0,
    date: new Date('2023-05-12'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'freelance'],
    notes: 'Payment for freelance project',
  },
  {
    user: users[1],
    transactionType: 'withdrawal',
    description: 'Office Supplies',
    amount: -450.0,
    date: new Date('2023-06-18'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[0],
    category: categories[1],
    tags: ['expense', 'office'],
    notes: 'Purchased office supplies',
  },
  {
    user: users[0],
    transactionType: 'deposit',
    description: 'Stock Dividends',
    amount: 600.0,
    date: new Date('2023-07-22'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'dividends'],
    notes: 'Received stock dividends',
  },
  {
    user: users[1],
    transactionType: 'withdrawal',
    description: 'Restaurant Bill',
    amount: -120.0,
    date: new Date('2023-08-15'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[0],
    category: categories[1],
    tags: ['expense', 'dining'],
    notes: 'Dinner at a restaurant',
  },
  {
    user: users[0],
    transactionType: 'deposit',
    description: 'Gift',
    amount: 500.0,
    date: new Date('2023-09-10'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'gift'],
    notes: 'Received birthday gift',
  },
  {
    user: users[1],
    transactionType: 'withdrawal',
    description: 'Car Maintenance',
    amount: -300.0,
    date: new Date('2023-09-10'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[0],
    category: categories[2],
    tags: ['expense', 'car'],
    notes: 'Paid for car maintenance',
  },
  {
    user: users[0],
    transactionType: 'transfer',
    description: 'Savings Transfer',
    amount: -1000.0,
    date: new Date('2023-10-01'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[1],
    category: categories[2],
    tags: ['transfer', 'savings'],
    notes: 'Transferred to savings account',
  },
  {
    user: users[1],
    transactionType: 'deposit',
    description: 'Investment Return',
    amount: 2000.0,
    date: new Date('2023-10-02'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'investment'],
    notes: 'Return on investment',
  },
  {
    user: users[0],
    transactionType: 'withdrawal',
    description: 'Medical Expenses',
    amount: -250.0,
    date: new Date('2023-10-03'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[2],
    tags: ['expense', 'medical'],
    notes: 'Paid for medical checkup',
  },
  {
    user: users[1],
    transactionType: 'deposit',
    description: 'Freelance Payment',
    amount: 1500.0,
    date: new Date('2023-10-05'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[0],
    category: categories[0],
    tags: ['income', 'freelance'],
    notes: 'Payment from freelance work',
  },
  {
    user: users[0],
    transactionType: 'withdrawal',
    description: 'Online Shopping',
    amount: -80.0,
    date: new Date('2023-10-06'),
    sourceAccount: assetAccounts[0],
    destinationAccount: expenseAccounts[0],
    category: categories[1],
    tags: ['expense', 'shopping'],
    notes: 'Bought items online',
  },
  {
    user: users[1],
    transactionType: 'transfer',
    description: 'Rent Payment',
    amount: -1200.0,
    date: new Date('2023-10-07'),
    sourceAccount: assetAccounts[1],
    destinationAccount: expenseAccounts[1],
    category: categories[2],
    tags: ['expense', 'rent'],
    notes: 'Paid monthly rent',
  }
];
