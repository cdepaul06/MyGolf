/** @typedef {import("./dtos/user.dtos.js").UserReadDto} UserReadDto */
/** @typedef {import("./dtos/user.dtos.js").UserUpdateDto} UserUpdateDto */
/** @typedef {import("./dtos/user.dtos.js").UserCreateDto} UserCreateDto */

/**
 * Factory that builds the Users API using your apiCall function.
 * @param {(path: string, options?: RequestInit) => Promise<any>} apiCall
 */
export function createUsersApi(apiCall) {
  return {
    /** @returns {Promise<UserReadDto>} */
    getMe: () => apiCall("users/me"),

    /** @param {UserCreateDto} dto @returns {Promise<UserReadDto>} */
    createOrCompleteMe: (dto) =>
      apiCall("users/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      }),

    /** @param {UserUpdateDto} dto @returns {Promise<UserReadDto>} */
    updateMe: (dto) =>
      apiCall("users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      }),

    /** @returns {Promise<null>} */
    deleteMe: () =>
      apiCall("users/me", {
        method: "DELETE",
      }),
  };
}
