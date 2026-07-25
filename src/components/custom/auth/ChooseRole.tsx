import { useState } from "react";

import { useNavigate } from "react-router-dom";

// import { roleSchema } from "../../../schemas/auth.schema";

import { signUpUser } from "../../../Services/auth.service";

import type { AuthStep } from "../../../types/auth.types";
import { APP_ROUTES } from "../../../constants";
import { ROLES } from "../../../roles";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
};

const roles = [
  {
    id: ROLES.USER,
    title: "Employee",
  },
  {
    id: ROLES.INSTRUCTOR,
    title: "Instructor",
  },
  {
    id: ROLES.COMPANY,
    title: "Company",
  },
];

const ChooseRole = ({ setStep }: Props) => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) return;

    try {
      setLoading(true);

      const pendingUser = sessionStorage.getItem("pendingUser");

      if (!pendingUser) return;

      const parsedUser = JSON.parse(pendingUser);

      // const result = roleSchema.safeParse({
      //   role: selectedRole,
      // });

      // if (!result.success) return;

      const finalUser = {
        ...parsedUser,
        role: selectedRole,
      };

      await signUpUser(finalUser);

      sessionStorage.removeItem("pendingUser");

      navigate(APP_ROUTES.auth.login);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
        justify-center
        gap-xl

        px-lg
        py-xl

        md:flex-row
      "
    >
      {/* LEFT */}
      <div
        className="
          w-full

          lg:w-1/2
          lg:max-w-[45%]
        "
      >
        <div className="space-y-md">
          <p
            className="
              text-h2
              font-bold
              leading-none
              tracking-[-2px]
              text-light

              sm:text-display
            "
          >
            Tell Us
            <br />
            Who You Are
          </p>

          <p
            className="
              max-w-[500px]
              text-body-lg
              leading-relaxed
              text-light-active
            "
          >
            Choose the role that best describes you to personalize your
            experience.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div
        className="
          w-full

          rounded-xl
          bg-card

          p-lg
          shadow-card

          sm:p-2xl

          lg:w-[45%]
        "
      >
        <div className="space-y-xl">
          <div className="space-y-sm">
            <h2
              className="
                text-h4
                font-bold
                text-text-primary
              "
            >
              Select Your Role
            </h2>

            <p
              className="
                text-body-sm
                text-normal
              "
            >
              Choose one option to continue
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              gap-md
            "
          >
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`
                  flex
                  h-[72px]
                  items-center
                  justify-center

                  rounded-xl

                  border-2

                  text-body-md
                  font-semibold

                  transition-all

                  ${
                    selectedRole === role.id
                      ? `
                        border-primary
                        bg-primary-light
                        text-primary
                      `
                      : `
                        border-border
                        bg-background
                        text-text-primary

                        hover:border-primary
                      `
                  }
                `}
              >
                {role.title}
              </button>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedRole || loading}
            className="
              h-[60px]
              w-full

              rounded-xl

              bg-primary

              text-lg
              font-semibold
              text-white

              transition-all

              hover:bg-primary-hover

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
