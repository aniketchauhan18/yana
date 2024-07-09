"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("../routes/v1/user.routes"));
const vehicle_routes_1 = __importDefault(
  require("../routes/v1/vehicle.routes"),
);
const payment_routes_1 = __importDefault(
  require("../routes/v1/payment.routes"),
);
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    origin: ["http://localhost:5173", "https://yana-vahan.vercel.app"],
  }),
);
app.use(express_1.default.json());
(0, dbConnection_1.default)();
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/vehicles", vehicle_routes_1.default);
app.use("/api/v1/payments", payment_routes_1.default);
app.listen(config_1.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${config_1.PORT || 3000}`),
);
