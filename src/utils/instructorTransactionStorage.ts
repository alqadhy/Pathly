import type {
  InstructorTransaction,
} from "../types/instructor.types";
const KEY = "instructor.transactions";


export const getTransactions = (): InstructorTransaction[] => {
  return JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
};


export const addTransaction = (
  transaction: InstructorTransaction
) => {
  const transactions = getTransactions();

  localStorage.setItem(
    KEY,
    JSON.stringify([
      ...transactions,
      transaction,
    ])
  );
};
export const getInstructorTransactions = (
  instructorEmail: string
) => {
  return getTransactions().filter(
    (item) =>
      item.instructorEmail === instructorEmail
  );
};

export const getInstructorRevenue = (
  instructorEmail: string
) => {
  const transactions =
    getInstructorTransactions(
      instructorEmail
    ).filter(
      (item) =>
        item.status === "Completed"
    );

  const totalRevenue =
    transactions.reduce(
      (sum, item) => sum + item.amount,
      0
    );

  const availableBalance =
    totalRevenue;

  const now = new Date();

  const thisMonth =
    transactions
      .filter((item) => {
        const date = new Date(
          item.date
        );

        return (
          date.getMonth() ===
            now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );
      })
      .reduce(
        (sum, item) =>
          sum + item.amount,
        0
      );

  return {
    totalRevenue,
    availableBalance,
    thisMonth,
  };
};
export const getInstructorRevenueChart = (
  instructorEmail: string
) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const transactions = getInstructorTransactions(
    instructorEmail
  ).filter(
    (item) => item.status === "Completed"
  );

  return months.map((month, index) => {
    const income = transactions
      .filter((item) => {
        const date = new Date(item.date);

        return date.getMonth() === index;
      })
      .reduce(
        (sum, item) => sum + item.amount,
        0
      );

    return {
      month,
      income,
    };
  });
};