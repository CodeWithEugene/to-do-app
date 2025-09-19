import { useAuth } from "./contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const { login, register } = useAuth();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (flow === "signIn") {
        await login(formData.email, formData.password);
        toast.success("Signed in successfully!");
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success("Account created successfully!");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {flow === "signUp" && (
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          className="input-field"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Please wait..." : flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <div className="text-center text-sm text-slate-600">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-blue-500 cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>
    </div>
  );
}