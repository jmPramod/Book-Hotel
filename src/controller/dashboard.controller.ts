import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import IncomeSchema  from "../Models/icome.models";
import  ExpenseSchema  from "../Models/expense.models";
import { ApiResponse } from "../utils/ApiResponse";

export const getDashboardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.user_info?.userId;

    // Validate userID
    if (!userID || !Types.ObjectId.isValid(userID)) {
      return res.status(400).json(new ApiResponse(400, null, "Invalid user ID"));
    }

    const userObjectId = new Types.ObjectId(userID);

    // Aggregate total income
    const totalIncomeAgg = await IncomeSchema.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // Aggregate total expense
    const totalExpenseAgg = await ExpenseSchema.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Last 60 days income
    const last60DaysIncomeTransaction = await IncomeSchema.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });
    const lastIncome60Days = last60DaysIncomeTransaction.reduce((sum, txn) => sum + txn.amount, 0);

    // Last 30 days expense
    const last30DaysExpenseTransaction = await ExpenseSchema.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });
    const lastExpense30Days = last30DaysExpenseTransaction.reduce((sum, txn) => sum + txn.amount, 0);

    // Last 5 income and expense transactions
    const recentIncome = (await IncomeSchema.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5)).map(txn => ({ ...txn.toObject(), type: "income" }));

    const recentExpense = (await ExpenseSchema.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5)).map(txn => ({ ...txn.toObject(), type: "expense" }));

    const recentTransaction = [...recentIncome, ...recentExpense].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    // Respond
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalBalance: totalIncome - totalExpense,
          totalIncome,
          totalExpense,
          last30DaysExpense: {
            total: lastExpense30Days,
            transaction: last30DaysExpenseTransaction
          },
          last60DaysIncome: {
            total: lastIncome60Days,
            transaction: last60DaysIncomeTransaction
          },
          recentTransaction
        },
        "Dashboard info fetched successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};