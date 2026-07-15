import {
  DialogClose,
} from "../../../ui/dialog";

import { X } from "lucide-react";

type Props = {
  title: string;
};

const PaymentHeader = ({
  title,
}: Props) => {
  return (
    <div
      className="
        mb-sm
        flex
        items-center
        justify-between
      "
    >
      <h2
        className="
          text-[32px]
          font-bold
          text-text-primary
        "
      >
        {title}
      </h2>

      <DialogClose asChild>
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-border
            bg-background
            transition-all
            duration-300
            hover:bg-muted
            active:bg-accent
          "
        >
          <X
            size={20}
            className="text-text-primary"
          />
        </button>
      </DialogClose>
    </div>
  );
};

export default PaymentHeader;