type Transaction = {
  id: number;
  studentName: string;
  studentAvatar: string;
  courseTitle: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

type Props = {
  transactions: Transaction[];
};

const statusStyles = {
  Completed: "bg-success-light text-success",
  Pending: "bg-warning-light text-warning",
  Failed: "bg-destructive/10 text-destructive",
};

const TransactionTable = ({ transactions }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="border-b border-border px-xl py-lg">
        <h3 className="text-h4 font-bold text-text-primary">
          Recent Transactions
        </h3>

        <p className="mt-xs text-body-sm text-text-secondary">
          Latest course purchases
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-xl py-lg text-left text-body-sm font-semibold text-text-secondary">
                Student
              </th>

              <th className="px-xl py-lg text-left text-body-sm font-semibold text-text-secondary">
                Course
              </th>

              <th className="px-xl py-lg text-left text-body-sm font-semibold text-text-secondary">
                Amount
              </th>

              <th className="px-xl py-lg text-left text-body-sm font-semibold text-text-secondary">
                Date
              </th>

              <th className="px-xl py-lg text-center text-body-sm font-semibold text-text-secondary">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border last:border-none hover:bg-muted/30"
              >
                <td className="px-xl py-lg">
                  <div className="flex items-center gap-md">
                    <img
                      src={item.studentAvatar}
                      alt={item.studentName}
                      className="h-11 w-11 rounded-full object-cover"
                    />

                    <span className="font-medium text-text-primary">
                      {item.studentName}
                    </span>
                  </div>
                </td>

                <td className="px-xl py-lg text-body-md text-text-primary">
                  {item.courseTitle}
                </td>

                <td className="px-xl py-lg font-semibold text-success">
                  {item.amount.toLocaleString()} EGP
                </td>

                <td className="px-xl py-lg text-body-sm text-text-secondary">
                  {item.date}
                </td>

                <td className="px-xl py-lg text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;