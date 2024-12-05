import transactionsSvc from "../services/transactions-svc";
import usersSvc from "../services/users-svc";
import credentialSvc from "../services/credential-svc";
import assetaccountSvc from "../services/assetaccount-svc";
import expenseaccountSvc from "../services/expenseaccount-svc";
import categorySvc from "../services/category-svc";
import { connect } from "../services/mongo";
import { Schema } from "mongoose";

// run this command to generate data npx etsc && node ./dist/scripts/generateData.js

connect("PennyPiggy");

async function main() {
  // Create additional users
  const user2 = await credentialSvc.create({
    username: "john_doe",
    email: "john.doe@example.com",
    password: "123456",
  });

  const user2Profile = await usersSvc.getByEmail(user2.email);

  console.log(user2Profile);

  // Create additional asset accounts
  const sourceAccount2 = await assetaccountSvc.create({
    accountName: "Savings Account",
    accountNumber: 654321,
    currentBalance: 5000,
    role: "personal",
    isActive: true,
    lastActivity: new Date(),
  });

  const sourceAccount3 = await assetaccountSvc.create({
    accountName: "Business Checking",
    accountNumber: 789012,
    currentBalance: 15000,
    role: "business",
    isActive: true,
    lastActivity: new Date(),
  });

  // Create additional expense accounts
  const destinationAccount2 = await expenseaccountSvc.create({
    accountName: "Utilities",
    accountNumber: 112233,
    currentBalance: 300,
    isActive: true,
    lastActivity: new Date(),
  });

  const destinationAccount3 = await expenseaccountSvc.create({
    accountName: "Travel Expenses",
    accountNumber: 445566,
    currentBalance: 800,
    isActive: true,
    lastActivity: new Date(),
  });

  // Create additional categories
  const category2 = await categorySvc.create({
    description: "Household Bills",
  });

  const category3 = await categorySvc.create({
    description: "Business Travel",
  });

  // Create additional transactions for user2
  await transactionsSvc.create({
    user: user2Profile._id as Schema.Types.ObjectId,
    description: "Paid Electricity Bill",
    amount: 120,
    date: new Date(),
    sourceAccount: sourceAccount2._id as Schema.Types.ObjectId,
    destinationAccount: destinationAccount2._id as Schema.Types.ObjectId,
    category: category2._id as Schema.Types.ObjectId,
    transactionType: "withdrawal",
    tags: ["utilities", "electricity"],
    notes: "Monthly electricity payment",
  });

  // Create additional transactions for user3
  await transactionsSvc.create({
    user: user2Profile._id as Schema.Types.ObjectId,
    description: "Flight to Conference",
    amount: 500,
    date: new Date(),
    sourceAccount: sourceAccount3._id as Schema.Types.ObjectId,
    destinationAccount: destinationAccount3._id as Schema.Types.ObjectId,
    category: category3._id as Schema.Types.ObjectId,
    transactionType: "withdrawal",
    tags: ["travel", "conference"],
    notes: "Attending annual business conference",
  });

  // Optionally, create more transactions for user1
  await transactionsSvc.create({
    user: user2Profile._id as Schema.Types.ObjectId,
    description: "Salary Deposit",
    amount: 3000,
    date: new Date(),
    sourceAccount: sourceAccount3._id as Schema.Types.ObjectId,
    destinationAccount: destinationAccount2._id as Schema.Types.ObjectId, // Assuming self-transfer
    category: category2._id as Schema.Types.ObjectId,
    transactionType: "deposit",
    tags: ["salary", "income"],
    notes: "Monthly salary",
  });

  // Create additional categories
const category4 = await categorySvc.create({
  description: "Groceries",
});

const category5 = await categorySvc.create({
  description: "Entertainment",
});

const category6 = await categorySvc.create({
  description: "Insurance",
});

const category7 = await categorySvc.create({
  description: "Education",
});

const category8 = await categorySvc.create({
  description: "Medical Expenses",
});

const category9 = await categorySvc.create({
  description: "Investment Income",
});

const category10 = await categorySvc.create({
  description: "Salary Income",
});

// Create additional asset accounts
const sourceAccount4 = await assetaccountSvc.create({
  accountName: "Credit Card",
  accountNumber: 901234,
  currentBalance: -2000,
  role: "personal",
  isActive: true,
  lastActivity: new Date(),
});

const sourceAccount5 = await assetaccountSvc.create({
  accountName: "Investment Account",
  accountNumber: 345678,
  currentBalance: 25000,
  role: "personal",
  isActive: true,
  lastActivity: new Date(),
});

// Create additional expense accounts
const destinationAccount4 = await expenseaccountSvc.create({
  accountName: "Supermarket",
  accountNumber: 778899,
  currentBalance: 0,
  isActive: true,
  lastActivity: new Date(),
});

const destinationAccount5 = await expenseaccountSvc.create({
  accountName: "Entertainment",
  accountNumber: 667788,
  currentBalance: 0,
  isActive: true,
  lastActivity: new Date(),
});

const destinationAccount6 = await expenseaccountSvc.create({
  accountName: "Doctor's Office",
  accountNumber: 556677,
  currentBalance: 0,
  isActive: true,
  lastActivity: new Date(),
});

const destinationAccount7 = await expenseaccountSvc.create({
  accountName: "University",
  accountNumber: 334455,
  currentBalance: 0,
  isActive: true,
  lastActivity: new Date(),
});

// Create additional transactions for user2

// Transaction 1
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Grocery Shopping",
  amount: 150,
  date: new Date("2023-03-05"),
  sourceAccount: sourceAccount4._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount4._id as Schema.Types.ObjectId,
  category: category4._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["groceries", "food"],
  notes: "Weekly grocery shopping",
});

// Transaction 2
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Car Insurance Payment",
  amount: 200,
  date: new Date("2023-03-10"),
  sourceAccount: sourceAccount2._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount2._id as Schema.Types.ObjectId,
  category: category6._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["car", "insurance"],
  notes: "Monthly car insurance",
});

// Transaction 3
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Sold Stocks",
  amount: 1000,
  date: new Date("2023-04-15"),
  sourceAccount: sourceAccount5._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount3._id as Schema.Types.ObjectId,
  category: category9._id as Schema.Types.ObjectId,
  transactionType: "deposit",
  tags: ["investment", "stocks"],
  notes: "Sold some stocks",
});

// Transaction 4
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Gym Membership Fee",
  amount: 50,
  date: new Date("2023-05-20"),
  sourceAccount: sourceAccount4._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount5._id as Schema.Types.ObjectId,
  category: category5._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["fitness", "health"],
  notes: "Monthly gym membership fee",
});

// Transaction 5
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Tuition Fee Payment",
  amount: 2000,
  date: new Date("2023-06-01"),
  sourceAccount: sourceAccount2._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount7._id as Schema.Types.ObjectId,
  category: category7._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["education", "tuition"],
  notes: "Semester tuition fee",
});

// Transaction 6
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Salary Deposit",
  amount: 3000,
  date: new Date("2023-06-15"),
  sourceAccount: sourceAccount2._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount4._id as Schema.Types.ObjectId,
  category: category10._id as Schema.Types.ObjectId,
  transactionType: "deposit",
  tags: ["salary", "income"],
  notes: "Monthly salary",
});

// Transaction 7
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Concert Tickets",
  amount: 200,
  date: new Date("2023-07-04"),
  sourceAccount: sourceAccount4._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount5._id as Schema.Types.ObjectId,
  category: category5._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["music", "concert"],
  notes: "Bought tickets for concert",
});

// Transaction 8
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Doctor Visit",
  amount: 150,
  date: new Date("2023-07-20"),
  sourceAccount: sourceAccount2._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount6._id as Schema.Types.ObjectId,
  category: category8._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["health", "medical"],
  notes: "Annual check-up",
});

// Transaction 9
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Investment Dividend",
  amount: 500,
  date: new Date("2023-07-25"),
  sourceAccount: sourceAccount5._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount7._id as Schema.Types.ObjectId,
  category: category9._id as Schema.Types.ObjectId,
  transactionType: "deposit",
  tags: ["investment", "dividend"],
  notes: "Quarterly dividends",
});

// Transaction 10
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Movie Night",
  amount: 50,
  date: new Date("2023-05-05"),
  sourceAccount: sourceAccount4._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount5._id as Schema.Types.ObjectId,
  category: category5._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["movies", "leisure"],
  notes: "Watched new release",
});

// Transaction 11
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Bought Groceries",
  amount: 130,
  date: new Date("2023-04-12"),
  sourceAccount: sourceAccount4._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount4._id as Schema.Types.ObjectId,
  category: category4._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["groceries", "food"],
  notes: "Weekly groceries",
});

// Transaction 12
await transactionsSvc.create({
  user: user2Profile._id as Schema.Types.ObjectId,
  description: "Paid Internet Bill",
  amount: 60,
  date: new Date("2023-03-20"),
  sourceAccount: sourceAccount2._id as Schema.Types.ObjectId,
  destinationAccount: destinationAccount2._id as Schema.Types.ObjectId,
  category: category2._id as Schema.Types.ObjectId,
  transactionType: "withdrawal",
  tags: ["utilities", "internet"],
  notes: "Monthly internet bill",
});

}

main();
