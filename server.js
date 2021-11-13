const server = require("./app");
const { sequelize } = require("./models");

server.listen(process.env.PORT || 3000, async () => {
  console.log("HELLo world");
  await sequelize.sync();
});
