//get random avatar from array of avatars
export const getRandomAvatar = (arrayOfAvatars) => {
  return arrayOfAvatars[Math.floor(Math.random() * 15)];
};
