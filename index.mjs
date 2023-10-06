import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import servicesApi from "./apis/Generals/Services.mjs";
import consultantApi from "./apis/Generals/Consultant.mjs";
import cashLocation from "./apis/Generals/CashCollecting.mjs";
import partyApi from "./apis/Generals/Party.mjs";
import dutyDoctor from "./apis/Generals/DutyDoctor.mjs";
import dutyStaff from "./apis/Generals/DutyStaff.mjs";
import department from "./apis/Generals/Department.mjs";
import CostCenter from "./apis/Generals/CostCenter.mjs";
import SubCost from "./apis/Generals/SubCostCenter.mjs";
import CostHead from "./apis/Generals/CostHead.mjs";
import PaymentTerm from "./apis/Generals/PaymentTerm.mjs";
import Country from "./apis/Generals/Country.mjs";
import Unit from "./apis/Generals/Unit.mjs";
import Speciality from "./apis/Generals/Speciality.mjs";
import Ward from "./apis/Generals/Ward.mjs";
import Generic from "./apis/Generals/Generic.mjs";
import CashRoaster from "./apis/Generals/CashRoaster.mjs";
import Discount from "./apis/Generals/Discount.mjs";
import Diagnosis from "./apis/Generals/Diagnosis.mjs";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);
app.use("/api/v1", servicesApi);
app.use("/api/v1", consultantApi);
app.use("/api/v1", cashLocation);
app.use("/api/v1", partyApi);
app.use("/api/v1", dutyDoctor);
app.use("/api/v1", dutyStaff);
app.use("/api/v1", department);
app.use("/api/v1", CostCenter);
app.use("/api/v1", SubCost);
app.use("/api/v1", SubCost);
app.use("/api/v1", CostHead);
app.use("/api/v1", PaymentTerm);
app.use("/api/v1", Country);
app.use("/api/v1", Unit);
app.use("/api/v1", Speciality);
app.use("/api/v1", Ward);
app.use("/api/v1", Generic);
app.use("/api/v1", CashRoaster);
app.use("/api/v1", Discount);
app.use("/api/v1", Diagnosis);

const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "./Frontend/build")));
app.use("*", express.static(path.join(__dirname, "./Frontend/build")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const MONGODB_URI = process.env.MONGODB_URI;

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(MONGODB_URI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Database is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run just before the app is closing
  console.log("app is terminating");
  mongoose.connection.close(); // Remove the callback function here
  console.log("Mongoose default connection closed");
  process.exit(0);
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
