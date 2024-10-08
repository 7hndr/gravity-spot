import mongoose from 'mongoose'

const geomSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  geom: geomSchema,
  tag_ids: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tag',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  adress: {
    type: String,
    required: true
  }
})

export const Spot = mongoose.model('Spot', SpotSchema)
