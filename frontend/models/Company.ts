import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  website: {
    type: String,
  },
});

export default mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);