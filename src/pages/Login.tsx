import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }

      const userData = userDoc.data();

      localStorage.setItem("sakhi-uid", uid);
      localStorage.setItem("sakhi-profile", JSON.stringify(userData));
      localStorage.setItem("sakhi-onboarded", "true");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 relative"
      style={{
        backgroundImage: "url('/images/ayurveda-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 248, 231, 0.6)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md mx-auto bg-white/80 p-6 rounded-xl shadow-lg text-center"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl font-bold text-foreground mb-4"
        >
          Login to <span className="text-primary-foreground">Her</span>
          <span className="text-secondary-foreground">Sakhi</span>
        </motion.h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onSubmit={handleLogin}
          className="mt-4 space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sakhi-lavender"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sakhi-pink"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#ffb8c0] text-white py-2 rounded-md hover:bg-sakhi-pink/90 transition-all"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin h-5 w-5 mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </motion.form>

        <p className="text-sm text-muted-foreground mt-4">
          Don't have an account?{" "}
          <a
            href="/onboarding"
            className="text-sakhi-lavender font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
