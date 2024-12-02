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
  const user3 = await credentialSvc.create({
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "123456",
  });

  const user2Profile = await usersSvc.getByEmail(user2.email);
  const user3Profile = await usersSvc.getByEmail(user3.email);

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
    user: user3Profile._id as Schema.Types.ObjectId,
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
}

main();
