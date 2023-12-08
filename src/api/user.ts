import { User } from "../types/user";
import request from "../utils/request";
import { showMessage } from "../utils/tools";

export function getUsers() {
  return request({
    url: "/user",
    method: "get",
  });
}

export async function login(data: User) {
  const { username, password } = data;
  // Mock Server Activities. not safe to pass password to client side, this should be done in server side.
  const res = await getUsers();
  const users: User[] = res.data;
  const resp = users.filter(
    (user) => user.username === username && user.password === password
  );
  if (resp.length > 0) {
    const token = JSON.stringify(username); // this is mock token, should be generated with ace encrypt by server side
    return {
      code: 200,
      message: "success",
      data: resp[0],
      token, // token should be transferred within response header
    };
  } else {
    return {
      code: 401,
      message: "Incorrect username or password",
      data: null,
    };
  }
}

export async function auth() {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await getUsers();
    const users: User[] = res.data;
    const resp = users.filter((user) => user.username === JSON.parse(token));
    if (resp.length > 0) {
      return {
        code: 200,
        message: "success",
        data: resp[0],
      };
    } else {
      localStorage.removeItem("token");
      return {
        code: 401,
        message: "Invalid token",
        data: null,
      };
    }
  } else {
    return {
      code: 401,
      message: "Invalid token",
      data: null,
    };
  }
}
