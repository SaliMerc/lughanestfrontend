import { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Header from "./Header.jsx";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard-home";

  const Google_Client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Redirect if already logged in
  useEffect(() => {
    if (auth?.accessToken) {
      navigate(from, { replace: true });
    }
  }, [auth, from, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setFormError("Please enter both your email and password.");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const response = await axios.post("/api/v1/users/login/", {
        username: formData.username,
        password: formData.password,
      });

      // Your API response uses access_token and user
      const { access_token, user } = response.data;

      if (!access_token || !user) throw new Error("Invalid login response");

      // ✅ Set auth state
      setAuth({ user, roles: user?.roles || [], accessToken: access_token });

      // Redirect to dashboard
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setFormError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    // credentialResponse contains Google credential token
    const googleToken = credentialResponse.credential;

    // Normally you would send this token to your backend to log in / register
    axios
      .post("/api/v1/users/google-login/", { token: googleToken })
      .then((res) => {
        const { access_token, user } = res.data;
        setAuth({ user, roles: ["user"], accessToken: access_token });
        navigate("/dashboard-home", { replace: true });
      })
      .catch((err) => {
        console.error("Google login error:", err);
        setFormError("Google login failed. Try again.");
      });
  };

  return (
    <>
      <Header />
      <section
        className="form-element login-section"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="form-div">
          <div className="form-title">
            <div className="heading-item">Login</div>
          </div>

          {/* Google Login */}
          <div className="login-with-google flex justify-center items-center">
            <GoogleOAuthProvider clientId={Google_Client_Id}>
              <GoogleLogin
                size="large"
                width={335}
                shape="pill"
                text="continue_with"
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setFormError("Google login failed")}
              />
            </GoogleOAuthProvider>
          </div>

          <div className="form-header-items flex justify-between items-center my-3 mx-2">
            <div><hr /></div>
            <div>or with email</div>
            <div><hr /></div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin}>
            <fieldset>
              <legend>Email*</legend>
              <input
                type="email"
                placeholder="Enter your email"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend>Password*</legend>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </fieldset>

            {formError && (
              <div className="form-header-items text-red-700 my-0 mx-2">
                <h5>{formError}</h5>
              </div>
            )}

            <div className="forgotten-pass-container">
              <Link to="/password-reset" className="underlined-item forgotten-pass">
                Forgotten Password?
              </Link>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}{" "}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="underlined-item">SignUp</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
