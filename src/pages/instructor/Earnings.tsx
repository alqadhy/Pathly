import { useEffect, useState } from "react";

import PaymentCard from "../../components/custom/instructor/Earnings/PaymentCard";
import RevenueChart from "../../components/custom/instructor/Earnings/RevenueChart";
import TransactionTable from "../../components/custom/instructor/Earnings/TransactionTable";
import WithdrawCard from "../../components/custom/instructor/Earnings/WithdrawCard";

import {
  getInstructorRevenue,
  getInstructorTransactions,
} from "../../utils/instructorTransactionStorage";

import type {
  InstructorRevenuePoint,
  InstructorTransaction,
} from "../../types/instructor.types";

const Earnings = () => {
  const [revenue, setRevenue] = useState({
    totalRevenue: 0,
    availableBalance: 0,
    thisMonth: 0,
  });

  const [transactions, setTransactions] =
    useState<InstructorTransaction[]>([]);

  const [chartData, setChartData] =
    useState<InstructorRevenuePoint[]>([]);

  const [lastPayout, setLastPayout] =
    useState("-");

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    if (!currentUser.email) return;

    const wallet = getInstructorRevenue(
      currentUser.email
    );

    setRevenue(wallet);

    const instructorTransactions =
      getInstructorTransactions(
        currentUser.email
      );

    setTransactions(instructorTransactions);

    const completedTransactions =
      instructorTransactions.filter(
        (item) =>
          item.status === "Completed"
      );

    if (completedTransactions.length) {
      setLastPayout(
        new Date(
          completedTransactions[
            completedTransactions.length - 1
          ].date
        ).toLocaleDateString()
      );
    }

    const currentYear =
      new Date().getFullYear();

    const monthlyRevenue = Array.from(
      { length: 12 },
      (_, index) => ({
        month: new Date(
          currentYear,
          index
        ).toLocaleString("en", {
          month: "short",
        }),
        income: 0,
      })
    );

    completedTransactions.forEach(
      (transaction) => {
        const month = new Date(
          transaction.date
        ).getMonth();

        monthlyRevenue[month].income +=
          transaction.amount;
      }
    );

    setChartData(monthlyRevenue);
  }, []);

  return (
    <section className="space-y-2xl">
      <div>
        <h2 className="text-h2 font-bold text-text-primary">
          Earnings
        </h2>

        <p className="mt-xs text-body-md text-text-secondary">
          Track your revenue, payouts and recent
          transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-xl lg:grid-cols-2">
        <PaymentCard
          totalRevenue={
            revenue.totalRevenue
          }
          thisMonth={
            revenue.thisMonth
          }
        />

        <WithdrawCard
          availableBalance={
            revenue.availableBalance
          }
          lastPayout={lastPayout}
        />
      </div>

      <RevenueChart
        data={chartData}
      />

      <TransactionTable
        transactions={transactions}
      />
    </section>
  );
};

export default Earnings;