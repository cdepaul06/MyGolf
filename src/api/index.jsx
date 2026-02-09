import { useMemo } from "react";
import { useApiCall } from "./client/useApiCall";
import { createUsersApi } from "./users.api";

export function useApi() {
  const apiCall = useApiCall();

  return useMemo(() => {
    return {
      users: createUsersApi(apiCall),
    };
  }, [apiCall]);
}
