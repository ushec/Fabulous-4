// Get the functions in the db.js file to use
const db = require('../data/database.js');
const bcrypt = require("bcryptjs");
class User {
 // Id of the user
 id;
 // Email of the user
 email;
 constructor(email) {
 this.email = email;
 }

 // Get an existing user id from an email address, or return false if not found
 async getIdFromEmail() {
    const connection = await db();
    var sql = "SELECT id FROM Users WHERE Users.email = ?";
    const result = await connection.query(sql, [this.email]);
    // TODO LOTS OF ERROR CHECKS HERE..
    if (JSON.stringify(result) != '[]') {
    this.id = result[0].id;
    return this.id;
    }
    else {
    return false;
    }
 }
 // Add a password to an existing user
 async setUserPassword(password) {
    const connection = await db();
    const pw = await bcrypt.hash(password, 10);
    var sql = "UPDATE Users SET password = ? WHERE Users.id = ?"
    const result = await db.query(sql, [pw, this.id]);
    return true;
 }

 // Add a new record to the users table
 async addUser(password) {
    const connection = await db();
    const pw = await bcrypt.hash(password, 10);
    var sql = "INSERT INTO Users (email, password) VALUES (? , ?)";
    const result = await connection.query(sql, [this.email, pw]);
    console.log(result.insertId);
    this.id = result.insertId;
    return this.id;
 }
 // Test a submitted password against a stored password
 async authenticate(submitted) {
    // Get the stored, hashed password for the user
    const connection = await db();
    var sql = "SELECT password FROM Users WHERE id = ?";
    const result = await connection.query(sql, [this.id]);
    const match = await bcrypt.compare(submitted, result[0].password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
 }
}
module.exports = {
    User
}