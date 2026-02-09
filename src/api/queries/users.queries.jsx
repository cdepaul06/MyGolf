import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../index";

/** @typedef {import("../dtos/user.dtos.js").UserUpdateDto} UserUpdateDto */

export const userKeys = {
  me: ["user", "me"],
};

export function useMeQuery() {
  const api = useApi();

  return useQuery({
    queryKey: userKeys.me,
    queryFn: () => api.users.getMe(),
  });
}

export function useUpdateMeMutation() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    /** @param {UserUpdateDto} dto */
    mutationFn: (dto) => api.users.updateMe(dto),
    onSuccess: () => {
      // TanStack Query v5 expects an object here
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
}
