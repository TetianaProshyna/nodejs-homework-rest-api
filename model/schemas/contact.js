const { Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: [2, "Name cannot be less then 2 letters"],
      unique: true,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "No userId for contact"],
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.plugin(mongoosePaginate);
module.exports = contactSchema;
