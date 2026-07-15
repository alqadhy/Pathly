type Props = {
  price: number;
};

const OrderSummary = ({
  price,
}: Props) => {
  return (
    <div className="space-y-xl">

      <h3
        className="
          text-[28px]
          font-bold
          text-text-primary
        "
      >
        Order Summary
      </h3>

      <div className="space-y-lg">

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <span
            className="
              text-[18px]
              text-text-secondary
            "
          >
            Course Price:
          </span>

          <span
            className="
              text-[22px]
              font-semibold
              text-text-primary
            "
          >
            {price} EGP
          </span>
        </div>

        {/* DISCOUNT */}
        <div className="flex items-center justify-between">
          <span
            className="
              text-[18px]
              text-text-secondary
            "
          >
            Discount:
          </span>

          <span
            className="
              text-[22px]
              font-semibold
              text-success
            "
          >
            -0 EGP
          </span>
        </div>

        <div className="h-px bg-border" />

        {/* TOTAL */}
        <div className="flex items-center justify-between">
          <span
            className="
              text-[24px]
              font-bold
              text-text-primary
            "
          >
            Total:
          </span>

          <span
            className="
              text-[30px]
              font-bold
              text-primary
            "
          >
            {price} EGP
          </span>
        </div>

      </div>
    </div>
  );
};

export default OrderSummary;