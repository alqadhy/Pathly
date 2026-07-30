import { Wallet } from "lucide-react";

type Props = {
  totalRevenue: number;
  thisMonth: number;
};

const PaymentCard = ({
  totalRevenue,
  thisMonth,
}: Props) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-xl shadow-card">
      <div className="mb-lg flex items-center justify-between">
        <div>
          <p className="text-body-sm text-text-secondary">
            Total Revenue
          </p>

          <h2 className="mt-xs text-h2 font-bold text-text-primary">
            {totalRevenue.toLocaleString()} EGP
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
          <Wallet size={28} className="text-primary" />
        </div>
      </div>

      <div className="rounded-xl bg-muted p-lg">
        <p className="text-body-sm text-text-secondary">
          This Month
        </p>

        <p className="mt-xs text-h4 font-semibold text-success">
          +{thisMonth.toLocaleString()} EGP
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;