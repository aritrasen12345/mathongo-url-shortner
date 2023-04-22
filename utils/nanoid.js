import { customAlphabet } from "nanoid";

const generateUniqueId = (count = 6) => {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, count);

  return nanoid();
};

console.log(generateUniqueId());

export default generateUniqueId;
