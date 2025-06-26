import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Demo Showroom | Forgot Password",
  description: "Halaman untuk meminta link reset kata sandi",
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
