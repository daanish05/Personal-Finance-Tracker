"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider";

export default function Register() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
      } else {
        setUser(data.user);
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
      <main className="min-h-screen flex items-center justify-center bg-surface-container-low px-2">
        <div className="w-[88%] md:w-[80%] lg:w-[70%] xl:w-[60%] bg-surface-container-lowest border border-outline-variant rounded-xl p-xl">
          <div className="text-center mb-lg">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-md">
              <span className="material-symbols-outlined text-on-primary text-[32px]">
                account_balance
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              Create Account
            </h1>
            <p className="text-on-surface-variant font-body-md mt-1">
              Join WealthFlow to manage your finances
            </p>
          </div>

          {error && (
            <div className="mb-md p-md bg-error-container/20 border border-error/30 rounded-lg flex items-center gap-sm">
              <span className="material-symbols-outlined text-error text-[20px]">
                error
              </span>
              <span className="font-body-sm text-body-sm text-error">
                {error}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-lg">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              />
            </div>

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
                minLength={6}
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-lg text-center font-body-sm text-body-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-label-md hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useAuth } from "@/contexts/AuthProvider";

// export default function Register() {
//   const router = useRouter();
//   const { setUser } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         setError(data.message);
//       } else {
//         setUser(data.user);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         router.push("/");
//       }
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Material Icons */}
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//           .material-symbols-outlined {
//             font-variation-settings:
//               "FILL" 0,
//               "wght" 400,
//               "GRAD" 0,
//               "opsz" 24;
//             vertical-align: middle;
//           }
//         `,
//         }}
//       />

//       <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-surface-container-low">
//         <div className="w-full max-w-md sm:max-w-lg bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-5 sm:p-6 md:p-8">
//           {/* Header */}
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
//               <span className="material-symbols-outlined text-on-primary text-2xl sm:text-3xl">
//                 account_balance
//               </span>
//             </div>

//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">
//               Create Account
//             </h1>

//             <p className="text-sm sm:text-base text-on-surface-variant mt-1">
//               Join WealthFlow to manage your finances
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mb-4 p-3 sm:p-4 bg-error-container/20 border border-error/30 rounded-lg flex items-start gap-2">
//               <span className="material-symbols-outlined text-error text-lg">
//                 error
//               </span>
//               <span className="text-sm text-error">{error}</span>
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
//             {/* Name */}
//             <div className="space-y-1">
//               <label className="text-sm text-on-surface-variant">
//                 Full Name
//               </label>
//               <input
//                 name="name"
//                 type="text"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 required
//                 className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
//               />
//             </div>

//             {/* Email */}
//             <div className="space-y-1">
//               <label className="text-sm text-on-surface-variant">Email</label>
//               <input
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="john@example.com"
//                 required
//                 className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-1">
//               <label className="text-sm text-on-surface-variant">
//                 Password
//               </label>
//               <input
//                 name="password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//                 minLength={6}
//                 className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary text-on-primary py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <span className="material-symbols-outlined animate-spin text-base">
//                     progress_activity
//                   </span>
//                   Creating account...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="mt-6 sm:mt-8 text-center text-sm text-on-surface-variant">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="text-primary font-medium hover:underline"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </main>
//     </>
//   );
// }
