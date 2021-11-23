const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowerCase: true,
    },
    content: {
      type: String,
      required: true,
      minLength: [10, "Blog content must be at least 10 characters long"],
      maxLength: [1000, "Blog content must be at most 1000 characters long"],
    },
    slug: {
      type: String,
      required: true,
      lowerCase: true,
      unique: true,
    },
    image: {
      type: String,
    },
    category: {
      type: [String],
      required: true,
    },
  },
  { strict: false }
);

const Blog = mongoose.model("Blog", blogSchema);

// const eventSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       lowerCase: true,
//     },
//     content: {
//       type: String,
//       required: true,
//       minLength: [10, "Event content must be at least 10 characters long"],
//       maxLength: [1000, "Event content must be at most 1000 characters long"],
//     },
//     slug: {
//       type: String,
//       required: true,
//       lowerCase: true,
//     },
//     category: {
//       type: [String],
//       required: true,
//     },
//     startDate: {
//       type: Date,
//       required: true,
//     },
//     endDate: {
//       type: Date,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//   },
//   { strict: false }
// );

// const Event = mongoose.model("Event", eventSchema);

// exports.Event = Event;
exports.Blog = Blog;
