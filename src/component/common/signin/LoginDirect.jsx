import "./Signin.scss";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useLoginDirectMutation } from "../../../store/service/authService";
import { useNavigate } from "react-router-dom";
import { convertCodeReverse, imgUrl } from "../../../store/constant";

const UserIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="user"
    width="1em"
    height="1em"
    fill="#00000040"
    aria-hidden="true">
    <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="lock"
    width="1em"
    height="1em"
    fill="#00000040"
    aria-hidden="true">
    <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path>
  </svg>
);

const EyeIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="eye"
    width="1em"
    height="1em"
    fill="#00000040"
    aria-hidden="true">
    <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="eye-invisible"
    width="1em"
    height="1em"
    fill="#00000040"
    aria-hidden="true">
    <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
    <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
  </svg>
);

const LoginDirect = () => {
  const nav = useNavigate();
  const [trigger, { error }] = useLoginDirectMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) return;

    const payload = {
      userId: convertCodeReverse(username.trim()),
      password: password.trim(),
      url: "superadmin.antpro.co",
      // url: "superadmin.urb99.com",
    };

    setLoading(true);

    try {
      const res = await trigger(payload).unwrap();
      if (res?.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("rulesStatus", true);
        localStorage.setItem("userId", res?.userId);
        localStorage.setItem("userType", res?.userTypeInfo);
        localStorage.setItem("username", res?.username);
        localStorage.setItem("ps", res?.ps);
        nav("/dashboard");
      } else {
        message.error(res?.message || "Login failed");
      }
    } catch {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error?.data?.message) {
      message.error(error.data.message);
    }
  }, [error]);

  return (
    <main className="signin-wrapper">
      <div className="signin-card">
        <div className="signin-left">
          <div>
            <h2>LOGIN</h2>
            <p>
              USE YOUR USERNAME AND PASSWORD <br />
              TO ACCESS YOUR ACCOUNT.
            </p>
          </div>

          <img src={imgUrl} alt="logo" className="form-logo" />
        </div>

        <div className="signin-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <div className={`input-wrap ${!username ? "error" : ""}`}>
                <UserIcon />
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {!username && (
                <p className="login-error">PLEASE INPUT YOUR USERNAME!</p>
              )}
            </div>

            <div className="login-form-group">
              <div className={`input-wrap ${!password ? "error" : ""}`}>
                <LockIcon />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>

              {!password && (
                <p className="login-error">PLEASE INPUT YOUR PASSWORD!</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`login-btn ${loading ? "disabled" : ""}`}>
              {loading && <span className="loader" />}
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginDirect;
