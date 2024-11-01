const connection = require("./config/connection");

connection().then(({ url, server }) => {
  console.log(`listen ${url}`);
});
