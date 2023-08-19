const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyparser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const userAdmin = require("./routes/adminUserRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const connectMongo = require("./config/db/db.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5904;
const URL = `http://localhost:${PORT}/`;

connectMongo();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// Other middleware and configurations

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from this side 😂" });
});

app.use("/api/users", userRoutes);
app.use("/api/admin", userAdmin);
// Use the '/api/products' routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

app.listen(PORT, () => {
  console.log(
    `*************************************************************
*                                                           *
*       App Name  : nwkfacion,                              *
*       Version : 1.0.0,                                    *
*       Main : app.js ,                                     *
*       Copyright (c) 2023, nwkfacion.                      *
*       Server Listening on ${URL}          *
*                                                           *
*************************************************************  
`
  );
});
