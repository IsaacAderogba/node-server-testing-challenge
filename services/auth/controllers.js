const Auth = require("./model");

module.exports = {
  getUsers: async function() {
    return await Auth.findUsers();
  },
  getUserById: async function(id) {
    return await Auth.findUserById(id);
  },
  getUserByFilter: async function(filter) {
    return await Auth.findUserByFilter(filter);
  },
  postUser: async function(user) {
    return await Auth.insertUser(user);
  },
  deleteUser: async function(id) {
    return await Auth.removeUser(id);
  }
};
