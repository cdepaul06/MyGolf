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

      const res = await fetch("https://localhost:7296/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const contentType = res.headers.get("content-type") ?? "";
      const text = await res.text();

      console.log("Status:", res.status, res.statusText);
      console.log("Body:", text);

      if (!res.ok) {
        throw new Error(`API ${res.status}: ${text || "(empty body)"}`);
      }

      const data =
        contentType.includes("application/json") && text
          ? JSON.parse(text)
          : text;

      console.log("Parsed:", data);
    } catch (e) {
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
