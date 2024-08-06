"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./routes/v1/user.routes"));
const vehicle_routes_1 = __importDefault(require("./routes/v1/vehicle.routes"));
const payment_routes_1 = __importDefault(require("./routes/v1/payment.routes"));
const vehicle_controller_1 = require("./controllers/vehicle.controller");
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    origin: ["http://localhost:5173", "https://yana-vahan.vercel.app"],
  }),
);
app.use(express_1.default.json());
(0, dbConnection_1.default)();
node_cron_1.default.schedule("*/15 * * * *", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, vehicle_controller_1.checkandRemoveExpiredRentals)();
    } catch (error) {
      console.error(
        "Error running scheduled task checkandRemoveExpiredRentals():",
        error,
      );
    }
  }),
);
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/vehicles", vehicle_routes_1.default);
app.use("/api/v1/payments", payment_routes_1.default);
app.listen(config_1.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${config_1.PORT || 3000}`),
);
//# sourceMappingURL=index.js.map
