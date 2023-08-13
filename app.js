// Import file konfigurasi MongoDB
require("./src/config/mongodb.config");

const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Gunakan rute-rute yang telah didefinisikan
const SetupVideoRoutes = require("./src/routes/video.route");
const videoRoutes = SetupVideoRoutes();
const setupProductRoutes = require("./src/routes/product.route");
const productRoutes = setupProductRoutes();
const SetupUserRoutes = require("./src/routes/user.route");
const userRoutes = SetupUserRoutes();
const SetupCommentRoutes = require("./src/routes/comment.route");
const commentRoutes = SetupCommentRoutes();
app.use("/videos", videoRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Jalankan aplikasi Express pada port yang ditentukan
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
