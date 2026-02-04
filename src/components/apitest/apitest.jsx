import { useAuth0 } from "@auth0/auth0-react";

export function ApiTest() {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const callApi = async () => {
    if (isLoading) return;

    if (!isAuthenticated) {
      await loginWithRedirect({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      });
      return;
    }

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      });

      const res = await fetch("https://localhost:7296/api/test/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(await res.json());
    } catch (e) {
      // If silent token fetch fails, force interactive login
      if (e?.error === "login_required") {
        await loginWithRedirect({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: "openid profile email",
          },
        });
        return;
      }
      console.error("Error calling API:", e);
    }
  };

  return (
    <button onClick={callApi} disabled={isLoading}>
      Call API
    </button>
  );
}
