import emailjs from "@emailjs/browser";

type SendOtpParams = {
  email: string;
  otp: string;
};

export const sendOtpEmail = ({ email, otp }: SendOtpParams) => {
  const templateParams = {
    to_email: email,
    otp: otp,
  };

  return emailjs.send(
    "service_onjj32t",
    "template_3wp8myz",
    templateParams,
    "pU7ygyL8hx_ckh3BR"
  );
};