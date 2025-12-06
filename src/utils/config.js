//logging operations
export const API_LOG_IN = "http://localhost:3000/api/user/login";
export const API_LOG_OUT = "http://localhost:3000/api/user/logout";

//sending OTP operation
export const API_SEND_OTP = "http://localhost:3000/api/otp/send-otp";

//password reseting
export const API_FORGOT_PASSWORD =
  "http://localhost:3000/api/user/forgetpassword";

//get data to kepp logged in
export const API_GET_DATA = "http://localhost:3000/api/user/myData";

//get slice of users
export const API_GET_USERS = (pageNum) =>
  `http://localhost:3000/api/user/allusers?page=${pageNum}&limit=3`;

//get user by id
export const API_GET_USER_BY_ID = (id) =>
  `http://localhost:3000/api/user/data/${id}`;

//delete user
export const API_DELETE_USER = `http://localhost:3000/api/user/delete`;

//add rundom avatars
export const AVATAR_EMOJIS = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🦄",
  "🐙",
  "🦋",
  "🐢",
  "🐍",
  "🦎",
  "🐊",
  "🦖",
  "🦕",
  "🐢",
  "🦀",
  "🦞",
  "🦐",
  "🐬",
  "🐳",
];
