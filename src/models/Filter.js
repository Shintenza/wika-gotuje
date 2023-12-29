import { Schema, models, model } from 'mongoose';

const filterSchema = new Schema({
  filterName: {
    type: String,
    required: true,
  },
  filterDisplayName: {
    type: String,
    required: true,
  },
  availableOptions: [
    {
      type: String,
    },
  ],
});

const Filter = models.Filter || model('Filter', filterSchema);
export default Filter;
