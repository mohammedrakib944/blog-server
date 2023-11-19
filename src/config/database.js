import mysql from "mysql2";

// For Development environment
const configureDev = {
  host: "localhost",
  user: "root",
  database: "blog",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// For Production environment
const configureProd = {
  host: "localhost",
  user: "nrorg_root",
  database: "nrorg_blog",
  password: "root_rakib_blog123",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

const pool = mysql.createPool(configureDev).promise();

export default pool;
