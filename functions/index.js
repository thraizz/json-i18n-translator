const admin = require("firebase-admin");

admin.initializeApp();

// Initialize default data for new users
exports.usercreationhook = require("./createUserHook").createUserHook;
// exports.removeuserhook = require("./removeUserHook").removeUserHook;
