require("dotenv").config({ path: ".env" });
const Pusher = require("pusher");

const ConfigPusher = () => {
  const pusher = new Pusher({
    appId: "1651410",
    key: "5685301a3db72a420893",
    secret: "50718b2ee87ae88d3970",
    cluster: "ap1",
    useTLS: true,
  });

  return pusher;
};

module.exports = ConfigPusher;
