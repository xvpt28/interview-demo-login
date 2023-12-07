import request from "../utils/request";

export function getUsers() {
  return request({
    url: "/user",
    method: "get",
  });
}
