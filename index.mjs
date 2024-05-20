import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
mongoose.set("strictQuery", false);
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
import Approval from "./apis/Generals/Approvals.mjs";
import ServiceCharges from "./apis/ER/ServiceCharges.mjs";
import ConsultantCharges from "./apis/ER/ConsultantCharges.mjs";
import WardCharges from "./apis/ER/WardCharges.mjs";
import UserWiseWard from "./apis/ER/UserWiseWard.mjs";
import ERPatientRegister from "./apis/ER/Transction/ERPatientRegister.mjs";
import ERFrontReg from "./apis/ER/Transction/ERFrontReg.mjs";
import InternalServices from "./apis/ER/Transction/BedAllocation/InternalServices.mjs";
import ConsultantVisit from "./apis/ER/Transction/BedAllocation/ConsultantVisit.mjs";
import LabService from "./apis/ER/Transction/BedAllocation/LabService.mjs";
import RadiologySevice from "./apis/ER/Transction/BedAllocation/RadiologySevice.mjs";
import MedicineService from "./apis/ER/Transction/BedAllocation/MedicineService.mjs";
import RunningBill from "./apis/ER/Transction/BedAllocation/RunningBill.mjs";
import DischargeSummary from "./apis/ER/Transction/BedAllocation/DischargeSummary.mjs";
import PatientDischarge from "./apis/ER/Transction/BedAllocation/PatientDischarge.mjs";
import SYMP$OBS$DIAG from "./apis/ER/Transction/Patient Investigation/SYMP-OBS-DIAG.mjs";
import PatientVitals from "./apis/ER/Transction/Patient Investigation/PatientVitals.mjs";
import ConsultantNotes from "./apis/ER/Transction/Patient Investigation/ConsultantNotes.mjs";
import ERFinalBill from "./apis/ER/Transction/ERBill.mjs";
import ReAdmission from "./apis/ER/Transction/REAdmission.mjs";
import radiologyCharges from "./apis/Radiology/Master/RadiologyCharges.mjs";
import userAndConsMapping from "./apis/Radiology/Master/ConsultantUserMapping.mjs";
import RadioTemplate from "./apis/Radiology/Master/Tempelate.mjs";
import UserWiseService from "./apis/Radiology/Master/UserWiseService.mjs";
import RadiologyTestRequisitionRegistration from "./apis/Radiology/Transaction/Test-Requisition.mjs";
import TaggingCash from "./apis/Radiology/Transaction/TaggingCash.mjs";
import LabTest from "./apis/Lab/Master/Test.mjs";
import GroupTest from "./apis/Lab/Master/Group.mjs";
import LabCharges from "./apis/Lab/Master/LabCharges.mjs";
import DepartmentRemarks from "./apis/Lab/Master/TestRemarks.mjs";
import RecieptType from "./apis/Generals/RecieptType.mjs";
import LabRegisteration from "./apis/Lab/Transaction/LabRegistration.mjs";
import ResultEntry from "./apis/Lab/Result/Result.mjs";
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
app.use("/api/v1", Approval);
app.use("/api/v1", ServiceCharges);
app.use("/api/v1", ConsultantCharges);
app.use("/api/v1", WardCharges);
app.use("/api/v1", UserWiseWard);
app.use("/api/v1", ERPatientRegister);
app.use("/api/v1", ERFrontReg);
app.use("/api/v1", InternalServices);
app.use("/api/v1", ConsultantVisit);
app.use("/api/v1", LabService);
app.use("/api/v1", RadiologySevice);
app.use("/api/v1", MedicineService);
app.use("/api/v1", RunningBill);
app.use("/api/v1", DischargeSummary);
app.use("/api/v1", PatientDischarge);
app.use("/api/v1", SYMP$OBS$DIAG);
app.use("/api/v1", PatientVitals);
app.use("/api/v1", ConsultantNotes);
app.use("/api/v1", ERFinalBill);
app.use("/api/v1", ReAdmission);
app.use("/api/v1", radiologyCharges);
app.use("/api/v1", userAndConsMapping);
app.use("/api/v1", RadioTemplate);
app.use("/api/v1", UserWiseService);
app.use("/api/v1", RadiologyTestRequisitionRegistration);
app.use("/api/v1", TaggingCash);
app.use("/api/v1", LabTest);
app.use("/api/v1", GroupTest);
app.use("/api/v1", LabCharges);
app.use("/api/v1", DepartmentRemarks);
app.use("/api/v1", RecieptType);
app.use("/api/v1", LabRegisteration);
app.use("/api/v1", ResultEntry);

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
