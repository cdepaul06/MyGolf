import { useAuth0 } from "@auth0/auth0-react";

export function useApiCall() {
  const { getAccessTokenSilently } = useAuth0();
  const baseUrl = import.meta.env.VITE_MYGOLF_BASE_API_URL;

  const apiCall = async (endpoint, options = {}) => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
    });

    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      method: options.method || "GET",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  };

  return apiCall;
}
