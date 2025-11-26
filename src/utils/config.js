export const API_LOG_IN = "http://localhost:3000/api/user/login";
export const API_GET_DATA = "http://localhost:3000/api/user/myData";
export const API_GET_USERS = (pageNum) =>
  `http://localhost:3000/api/user/allusers?page=${pageNum}&limit=10`;

export const API_GET_USER_BY_ID = (id) =>
  `http://localhost:3000/api/user/data/${id}`;
