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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, dbConnection_1.default)();
console.log("hiiii");
app.use("/users", user_routes_1.default);
console.log("hiiii");
app.listen(config_1.PORT, () =>
  console.log(`Server running on http://localhost:${config_1.PORT}`),
);
