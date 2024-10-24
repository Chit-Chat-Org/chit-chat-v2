import mongoose from 'mongoose'

const trainModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SignUp",
  },
  organizationName: {
    type: String,
    required: true,
  },
  uploadKnowledge: {
    type: String,
    required: true,
  },
  embeddingModel:{
    type:String,
    required: true
  },
  embeddedKnowlege: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  originalAPIKey: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const AiTrainingModel = mongoose.model(
  "OrganizationAITrainedKnwoledge",
  trainModel
);

export default AiTrainingModel;
