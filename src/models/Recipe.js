import { Schema, models, model } from 'mongoose';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  prepTime: {
    type: Number,
    required: true,
    min: 0,
  },
  ingredientsAvailability: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  portionsNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
  },
  starReviews: [
    {
      stars: { type: Number, min: 1, max: 5 },
      authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
  ],
  comments: [
    {
      authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      commentDateAdded: { type: Date, required: true },
      content: { type: String, required: true, minlength: 10 },
    },
  ],
  ingredients: {
    type: [String],
    validate: {
      validator: function(array) {
        return array.length >= 2;
      },
      message: 'at least two ingredients are required',
    },
  },
  steps: {
    type: [String],
    validate: {
      validator: function(array) {
        return array.length >= 2;
      },
      message: 'at least two steps are required',
    },
  },
  diet: {
    type: [String],
  },
  region: {
    type: [String],
  },
  image: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  dateAdded: { type: Date, default: Date.now },
  dateUpdated: Date,
});

const Recipe = models.Recipe || model('Recipe', recipeSchema);
export default Recipe;
