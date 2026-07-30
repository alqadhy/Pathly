import { Landmark } from "lucide-react";

import { Button } from "../../../ui/button";

type Props = {
  availableBalance: number;
  lastPayout: string;
  onWithdraw?: () => void;
};

const WithdrawCard = ({
  availableBalance,
  lastPayout,
  onWithdraw,
}: Props) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-xl shadow-card">
      <div>
        <div className="mb-lg flex items-center justify-between">
          <div>
            <p className="text-body-sm text-text-secondary">
              Available Balance
            </p>

            <h2 className="mt-xs text-h2 font-bold text-text-primary">
              {availableBalance.toLocaleString()} EGP
            </h2>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
            <Landmark size={28} className="text-primary" />
          </div>
        </div>

        <div className="rounded-xl bg-muted p-lg">
          <p className="text-body-sm text-text-secondary">
            Last Payout
          </p>

          <p className="mt-xs text-body-md font-medium text-text-primary">
            {lastPayout}
          </p>
        </div>
      </div>

      <Button
        onClick={onWithdraw}
        className="mt-xl h-12 w-full rounded-xl"
      >
        Withdraw Earnings
      </Button>
    </div>
  );
};

export default WithdrawCard;