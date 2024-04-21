const { randomBytes } = require("crypto");
const { hash } = require("bcrypt");
require("dotenv").config();

const size = +process.env.SIZE;
const format = process.env.FORMAT;
const salt = +process.env.SALT;

function generateApiKey(appName) {
  const buffer = randomBytes(size);
  return `${appName}-${buffer.toString(format)}`;
}

async function generateAppSecret(key) {
  const hashed = await hash(key, salt);
  return hashed;
}

module.exports = { generateApiKey, generateAppSecret };
