import mongoose from "mongoose";
import counterModel from "./../../../../helpers/counterModel.js";

const OrganizationSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    organizationId: {
      type: String,
      unique: true,
      index: true,
      required: [true, "El campo 'organizationId' es requerido"],
    },
    organizationAlias: {
      type: String,
      required: [true, "El campo 'organizationAlias' es requerido"],
    },
    organizationName: {
      type: String,
      required: [true, "El campo 'organizationName' es requerido"],
    },
    organizationEmail: {
      type: String,
      required: [true, "El campo 'organizationEmail' es requerido"],
    },
    organizationLogo: {
      type: String,
    },
    organizationOwner: {
      type: String,
      required: [true, "El campo 'organizationOwner' es requerido"]
    },
    organizationOwnerDocument:{
      type: String,
      required: [true, "El campo 'organizationOwnerDocument' es requerido"]
    },
    organizationOwnerEmail: {
      type: String,
    },
    organizationTelephone: {
      type: String,
    },
    organizationCellphone: {
      type: String,
    },
    organizationAddress: {
      type: String,
    },
    organizationWebsite: {
      type: String,
    },
    organizationSocials: {
      type: Object,
    },
    organizationStatus: {
      type: Number,
      default: 1,
    },
    liveUpdate: {
      type: Boolean,
      required: [true, "El campo 'liveUpdate' es requerido"]
    },
    offlineUpdate: {
      type: Boolean,
      required: [true, "El campo 'offlineUpdate' es requerido"]
    },
  },
  {
    timestamps: true,
  }
);


const Organization = mongoose.model("Organization", OrganizationSchema);
export default Organization;