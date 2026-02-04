import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

const ProtectedArea = () => {
  return (
    <div style={{ marginTop: 24, padding: 16, border: "1px solid #ddd" }}>
      <h2>Dashboard (Protected)</h2>
      <p>If you can see this, you’re logged in.</p>
    </div>
  );
};

const App = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } =
    useAuth0();

  const handleSignup = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
    });
  };

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
    });
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <>
      <h1>MyGolf</h1>

      {/* Auth buttons */}
      <div
        style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}
      >
        {!isAuthenticated && (
          <>
            <button onClick={handleSignup} disabled={isLoading}>
              Sign up
            </button>
            <button onClick={handleLogin} disabled={isLoading}>
              Log in
            </button>
          </>
        )}

        {isAuthenticated && (
          <>
            <button onClick={handleLogout} disabled={isLoading}>
              Log out
            </button>
            <span style={{ alignSelf: "center" }}>
              Logged in as <b>{user?.email || user?.name}</b>
            </span>
          </>
        )}
      </div>

      {/* Protected area */}
      {!isLoading && isAuthenticated && <ProtectedArea />}

      {!isLoading && !isAuthenticated && (
        <p style={{ marginTop: 16 }}>
          This is the public landing page. Sign up or log in to access the
          dashboard.
        </p>
      )}
    </>
  );
};

export default App;
