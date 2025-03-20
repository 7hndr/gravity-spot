import mongoose from 'mongoose'

const GeomSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

export const SpotSchema = mongoose.Schema({
  user_id: {
    name: 'User',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    hidden: true
  },
  name: {
    name: 'Spot name',
    type: String,
    required: true
  },
  geom: GeomSchema,
  // tag_ids: {
  //   name: 'Tags',
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Tag'
  //   required: true
  // },
  description: {
    name: 'Description',
    type: String,
    required: true
  },
  image_url: {
    name: 'Image link',
    type: String
    // required: true
  },
  created_at: {
    name: 'Created',
    type: Date,
    hidden: true,
    default: Date.now()
  },
  address: {
    name: 'Address',
    type: String,
    required: true
  },
  stars: {
    name: 'Stars',
    type: Number,
    hidden: true,
    default: 0
  }
})

export const Spot = mongoose.model('Spot', SpotSchema)
