import { Input } from "../../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Label } from "../../../ui/label";
import { Checkbox } from "../../../ui/checkbox";

type Props = {
  paymentMethod: "card" | "paypal" | "";
  setPaymentMethod: React.Dispatch<
    React.SetStateAction<"card" | "paypal" | "">
  >;

  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;

  expiry: string;
  setExpiry: React.Dispatch<React.SetStateAction<string>>;

  cvc: string;
  setCvc: React.Dispatch<React.SetStateAction<string>>;
};

const PaymentMethods = ({
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
}: Props) => {
  return (
    <div className="space-y-xl">
      <h3 className="text-[28px] font-bold text-text-primary">
        Payment Method
      </h3>

      <div className="rounded-2xl border border-border bg-light p-md">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) =>
            setPaymentMethod(value as "card" | "paypal" | "")
          }
          className="space-y-xl gap-8"
        >
          <div>
            <div className="flex items-center gap-md">
              <RadioGroupItem
                value="card"
                id="card"
                className="h-5 w-5 border-2 border-dark text-primary-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />

              <Label
                htmlFor="card"
                className="cursor-pointer text-body-lg font-medium text-text-primary"
              >
                Credit / Debit Card
              </Label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-xl space-y-lg">
                <div className="space-y-sm">
                  <Label className="text-[15px] font-semibold text-text-primary">
                    Card Number
                  </Label>

                  <Input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="•••• •••• •••• ••••"
                    className="h-[56px] rounded-xl border-border bg-card px-md text-body-md shadow-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 gap-md md:grid-cols-2">
                  <div className="space-y-sm">
                    <Label className="text-[15px] font-semibold text-text-primary">
                      Expiration Date
                    </Label>

                    <Input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="h-[56px] rounded-xl border-border bg-card px-md text-body-md shadow-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-sm">
                    <Label className="text-[15px] font-semibold text-text-primary">
                      CVC
                    </Label>

                    <Input
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="000"
                      className="h-[56px] rounded-xl border-border bg-card px-md text-body-md shadow-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-md">
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="h-5 w-5 border-2 border-dark text-primary-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />

            <Label
              htmlFor="paypal"
              className="cursor-pointer text-body-lg font-medium text-text-primary"
            >
              Paypal
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center gap-sm">
        <Checkbox
          id="save"
          defaultChecked
          className="h-5 w-5 rounded-md"
        />

        <Label
          htmlFor="save"
          className="cursor-pointer text-[15px] text-text-secondary"
        >
          Save card for future payment
        </Label>
      </div>
    </div>
  );
};

export default PaymentMethods;