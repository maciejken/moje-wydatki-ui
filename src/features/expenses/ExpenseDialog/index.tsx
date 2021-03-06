import { useAppDispatch, useAppSelector } from "app/hooks";
import { FC } from "react";
import { selectExpensesDate, selectExpensesMode } from "../expensesSelectors";
import { addExpense } from "../expensesThunks";
import { ExpensesMode, NewExpenseData } from "../expensesTypes";
import ExpenseDialog from "./ExpenseDialog";
import { setExpensesMode } from "../expensesActions";

const ExpenseDialogWrapper: FC = () => {
  const date = useAppSelector(selectExpensesDate);
  const expensesMode = useAppSelector(selectExpensesMode);
  const dispatch = useAppDispatch();
  const addExpenseHandler = (data: NewExpenseData) => {
    dispatch(addExpense(data));
    dispatch(setExpensesMode(ExpensesMode.Default));
  };
  const cancelHandler = () => {
    dispatch(setExpensesMode(ExpensesMode.Default));
  };

  if (expensesMode !== ExpensesMode.Create) {
    return null;
  }
  return (
    <ExpenseDialog
      date={date}
      onAddExpense={addExpenseHandler}
      onCancel={cancelHandler}
    />
  );
};

export default ExpenseDialogWrapper;
