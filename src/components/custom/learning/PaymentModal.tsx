import { useState } from "react";

import { useNavigate, useParams }
from "react-router-dom";

import {
  CreditCard,
  BadgePercent,
} from "lucide-react";

import { learningCourses } from "../../../../public/mocked/learning/learning";

import { Button }
from "../../ui/button";

import {
  Card,
  CardContent,
} from "../../ui/card";

import { Input }
from "../../ui/input";

import { Checkbox }
from "../../ui/checkbox";

import {
  RadioGroup,
  RadioGroupItem,
} from "../../ui/radio-group";

import { Label }
from "../../ui/label";

const LearningPayment = () => {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("visa");

  const [
    saveCard,
    setSaveCard,
  ] = useState(false);

  const course =
  learningCourses.find(
    (item) =>
      item.id === Number(id)
  );

  if (!course)
    return null;

  const originalPrice =
    course.price;

  const discount = 20;

  const finalPrice =
    originalPrice -
    (originalPrice *
      discount) /
      100;

  const handlePayment =
    () => {

      const loggedUser =
        JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          ) || "{}"
        );

      if (
        !loggedUser.email
      )
        return;

      const enrolledCourses =
        JSON.parse(
          localStorage.getItem(
            "enrolledCourses"
          ) || "[]"
        );

        const alreadyExists =
        enrolledCourses.find(
            (
            item: {
                email: string;
                courseId: string;
            }
            ) =>
            item.email ===
                loggedUser.email &&
            Number(
                item.courseId
            ) === course.id
        );

      if (
        !alreadyExists
      ) {

        enrolledCourses.push({
          email:
            loggedUser.email,

          courseId:
            course.id,
        });

        localStorage.setItem(
          "enrolledCourses",
          JSON.stringify(
            enrolledCourses
          )
        );
      }

      navigate(
        `/student/learning/${course.id}`
      );
    };

  return (
    <section className="min-h-screen bg-background px-md py-lg lg:px-lg"
>

  <div className="mx-auto max-w-[1200px]">

    {/* HEADER */}
    <div className="mb-2xl">

      <h1 className="text-h3 font-bold text-text-primary md:text-display">
        Complete Payment
      </h1>

      <p className="mt-sm text-body-lg text-text-secondary">
        Secure your course access and start learning today.
      </p>

    </div>

    <div className="grid gap-2xl lg:grid-cols-[1fr_380px]">

      {/* LEFT SIDE */}
      <Card className="rounded-3xl border-border shadow-card">

        <CardContent className="space-y-2xl p-xl">

              {/* PAYMENT METHOD */}
              <div className="space-y-lg">
                <div>
                  <h2 className="text-h4 font-bold text-text-primary">
                    Payment Method
                  </h2>

                  <p className="mt-xs text-body-sm text-text-secondary">
                    Choose your preferred payment option
                  </p>
                </div>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-md"
                >
                  {/* VISA */}
                  <Label
                    htmlFor="visa"
                    className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-card p-lg transition-all hover:border-primary"
                  >
                    <div className="flex items-center gap-md">
                      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-primary/10">
                        <CreditCard size={24} className="text-primary" />
                      </div>

                      <div>
                        <p className="text-body-md font-semibold text-text-primary">
                          Credit Card
                        </p>

                        <p className="text-body-sm text-text-secondary">
                          Visa / MasterCard
                        </p>
                      </div>
                    </div>

                    <RadioGroupItem value="visa" id="visa" />
                  </Label>

                  {/* PAYPAL */}
                  <Label
                    htmlFor="paypal"
                    className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-card p-lg transition-all hover:border-primary"
                  >
                    <div className="flex items-center gap-md">
                      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-info/10">
                        <BadgePercent size={24} className="text-info" />
                      </div>

                      <div>
                        <p className="text-body-md font-semibold text-text-primary">
                          PayPal
                        </p>

                        <p className="text-body-sm text-text-secondary">
                          Fast & secure checkout
                        </p>
                      </div>
                    </div>

                    <RadioGroupItem value="paypal" id="paypal" />
                  </Label>
                </RadioGroup>
              </div>

              {/* CARD FORM */}
              {paymentMethod === "visa" && (
                <div className="space-y-lg">
                  <div className="grid gap-lg">
                    {/* CARD NUMBER */}
                    <div className="space-y-sm">
                      <Label>Card Number</Label>

                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="h-[56px] rounded-xl"
                      />
                    </div>

                    {/* CARD HOLDER */}
                    <div className="space-y-sm">
                      <Label>Card Holder</Label>

                      <Input
                        placeholder="Mai Mohamed"
                        className="h-[56px] rounded-xl"
                      />
                    </div>

                    {/* ROW */}
                    <div className="grid gap-lg sm:grid-cols-2">
                      {/* EXPIRY */}
                      <div className="space-y-sm">
                        <Label>Expiry Date</Label>

                        <Input
                          placeholder="MM/YY"
                          className="h-[56px] rounded-xl"
                        />
                      </div>

                      {/* CVC */}
                      <div className="space-y-sm">
                        <Label>CVC</Label>

                        <Input
                          placeholder="123"
                          className="h-[56px] rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SAVE CARD */}
                  <div className="flex items-center gap-sm">
                    <Checkbox
                      id="saveCard"
                      checked={saveCard}
                      onCheckedChange={(checked) => setSaveCard(checked === true)}
                    />

                    <Label
                      htmlFor="saveCard"
                      className="cursor-pointer text-body-sm text-text-secondary"
                    >
                      Save card details for future payments
                    </Label>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>

          {/* RIGHT SIDE */}
          <Card className="h-fit rounded-3xl border-border shadow-card">

            <CardContent className="space-y-xl p-xl">

              <div>

                <h2 className="text-h4 font-bold text-text-primary">
                  Order Summary
                </h2>

                <p className="mt-xs text-body-sm text-text-secondary">
                  {course.title}
                </p>

              </div>

              {/* PRICE */}
              <div className="space-y-md">

                <div className="flex items-center justify-between">

                  <span className="text-body-md text-text-secondary">
                    Course Price
                  </span>

                  <span className="text-body-md font-semibold text-text-primary">
                    {originalPrice} EGP
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-body-md text-text-secondary">
                    Discount
                  </span>

                  <span className="font-semibold text-success">
                    -{discount}%
                  </span>

                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">

                  <span className="text-body-lg font-bold text-text-primary">
                    Total
                  </span>

                  <span className="text-h4 font-bold text-primary">
                    {finalPrice} EGP
                  </span>

                </div>

              </div>

              {/* BUTTON */}
              <Button
                onClick={handlePayment}
                className="h-[60px] w-full rounded-xl text-body-md font-semibold"
              >
                Pay & Start Course
              </Button>

            </CardContent>

          </Card>

        </div>
      </div>
    </section>
  );
};

export default LearningPayment;