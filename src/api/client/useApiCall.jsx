import { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const isDev = import.meta.env.DEV;

function joinUrl(base, endpoint) {
  if (!base) return endpoint;
  if (!endpoint) return base;
  return `${base.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
}

export function useApiCall() {
  const { getAccessTokenSilently } = useAuth0();
  const baseUrl = import.meta.env.VITE_MYGOLF_BASE_API_URL;

  const apiCall = useCallback(
    async (endpoint, options = {}) => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      });

      const url = joinUrl(baseUrl, endpoint);

      const res = await fetch(url, {
        ...options,
        method: options.method || "GET",
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = res.headers.get("content-type") || "";
      const raw = await res.text();

      if (isDev) {
        console.groupCollapsed(
          `API ${res.status} ${options.method || "GET"} ${url}`,
        );
        console.log("Request options:", options);
        console.log("Raw response:", raw || "(empty)");
        console.groupEnd();
      }

      if (!res.ok) {
        throw new Error(`API ${res.status}: ${raw || "(empty body)"}`);
      }

      if (!raw) return null;

      return contentType.includes("application/json") ? JSON.parse(raw) : raw;
    },
    [baseUrl, getAccessTokenSilently],
  );

  return apiCall;
}
