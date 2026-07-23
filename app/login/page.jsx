"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      .material-symbols-outlined {\n        font-variation-settings:\n          "FILL" 0,\n          "wght" 400,\n          "GRAD" 0,\n          "opsz" 24;\n        vertical-align: middle;\n      }\n    ',
        }}
      />
      <main className="min-h-screen flex items-center justify-center bg-surface-container-low px-4">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-xl">
          <div className="text-center mb-lg">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-md">
              <span className="material-symbols-outlined text-on-primary text-[32px]">
                account_balance
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              Welcome Back
            </h1>
            <p className="text-on-surface-variant font-body-md mt-1">
              Sign in to your WealthFlow account
            </p>
          </div>

          {error && (
            <div className="mb-md p-md bg-error-container/20 border border-error/30 rounded-lg flex items-center gap-sm">
              <span className="material-symbols-outlined text-error text-[20px]">
                error
              </span>
              <span className="font-body-sm text-body-sm text-error">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-lg">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary px-xl py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-sm"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-lg text-center font-body-sm text-body-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-label-md hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
