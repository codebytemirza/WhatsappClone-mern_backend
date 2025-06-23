const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: async (password) => await bcrypt.hash(password, 10),
  comparePassword: async (plain, hash) => await bcrypt.compare(plain, hash),
};
