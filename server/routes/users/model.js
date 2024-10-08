import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  first_name: {
    type: String,
    required: true
  },
  second_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

export const User = mongoose.model('User', UserSchema)
