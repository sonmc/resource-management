import { Get, Update, Create } from "../../Services/user.service";

export function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

  return {
    getAll,
    getById,
    update,
    create,
  };

  function getAll() {
    return Get(baseUrl);
  }

  function getById(id) {
    return Get(`${baseUrl}/${id}`);
  }

  function update(id, params) {
    return Update(`${baseUrl}/${id}`, params);
  }
  function create(params) {
    return Create(`${baseUrl}`, params);
  }
}
