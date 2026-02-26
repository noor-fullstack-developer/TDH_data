const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");

const app = express();

// Conection to Database
connectDB();

// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);

// This Start Server
const Port = 4000;
app.listen(Port , () => console.log(`Server running on http://localhost:${Port}/api/products`));