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
  ingredientsAvaliability: {
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
    max: 50
  },
  starReviews: [
    {
      stars: { type: Number, min: 1, max: 5 },
      authorId: { type: Schema.Type.ObjectId, ref: 'User', required: true },
    },
  ],
  comments: [
    {
      authorId: { type: Schema.Type.ObjectId, ref: 'User', required: true },
      commentDateAdded: { type: Date, required: true },
      content: { type: String, required: true, minlength: 10 },
    },
  ],
  ingredients: [
    {
      ingredientName: { type: String, required: true },
    },
  ],
  steps: [
    {
      stepName: { type: String },
    },
  ],
  diet: [
    {
      dietName: { type: String },
    },
  ],
  region: [
    {
      regionName: { type: String },
    },
  ],
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  dateAdded: { type: Date, required: true },
  dateUpdated: Date,
});

const Recipe = models.Recipe || model('Recipe', recipeSchema);
export default Recipe;
