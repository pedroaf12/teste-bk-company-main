import express from "express";
import cors from "cors";
import productRoutes from "./infra/http/routes/product.routes";
import orderRoutes from "./infra/http/routes/order.routes";
import dashboardRoutes from "./infra/http/routes/dashboard.routes";
import productCostRoutes from "./infra/http/routes/product-cost.routes";

const app = express();


app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true
}));

app.use(express.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/product-costs", productCostRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});