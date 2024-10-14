import { Spot } from './model.js'

const getSchemaDescription = schema => {
  return Object.keys(schema.paths).reduce((description, key) => {
    const path = schema.paths[key]

    const keyName = key === '_id' ? 'id' : key
    if (keyName === '__v') return description
    const fieldDescription = {
      type: path.instance,
      unique: !!path.options.unique
    }

    if (path.isRequired) {
      fieldDescription.required = true
    }

    if (path.options.unique) {
      fieldDescription.unique = true
    }

    if (path.options.name) {
      fieldDescription.name = path.options.name
    }

    if (path.options.hidden) {
      fieldDescription.hidden = true
    }

    if (path.options.ref) {
      fieldDescription.ref = path.options.ref
    }

    if (path.instance === 'Array' && path.caster && path.caster.instance) {
      fieldDescription.itemsType = path.caster.instance
    }

    description[keyName] = fieldDescription

    return description
  }, {})
}

export const getSpots = async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const search = req.query.search

    let query = {}
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    }

    if (!page && !limit) {
      const spots = await Spot.find(query)
      res.send(spots.map(spot => ({ ...spot._doc, id: spot._id })))
    } else {
      const skip = (page - 1) * limit

      const spots = await Spot.find(query).skip(skip).limit(limit)
      const total = await Spot.countDocuments(query)

      res.send({
        spots,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const getSpotSchema = async (req, res) => {
  try {
    const schemaDescription = getSchemaDescription(Spot.schema)
    res.send(schemaDescription)
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const getOneSpot = async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id)
    res.send({ ...spot._doc, id: spot._id })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const createSpot = async (req, res) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : ''

    const spotData = {
      name: req.body.name,
      description: req.body.description,
      geom: JSON.parse(req.body.geom),
      user_id: req.body.user_id,
      address: req.body.address,
      image_url: imageUrl
    }

    // console.log('spotData', spotData)
    const newSpot = await Spot.create(spotData)
    res
      .status(201)
      .send({ message: 'Spot created', data: newSpot, id: newSpot._id })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal server error' })
  }
}
export const updateSpot = async (req, res) => {
  try {
    const updatedSpot = await Spot.findOneAndUpdate(
      { _id: req.body.id },
      { ...req.body },
      { new: true }
    )
    if (!updatedSpot) {
      return res.status(404).send({ message: 'Spot not found' })
    }
    res.status(200).send({
      message: 'Spot updated',
      data: { ...updatedSpot._doc, id: updatedSpot._id }
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const deleteSpot = async (req, res) => {
  try {
    await Spot.deleteOne({ _id: req.params.id })
    res.status(200).send({ message: 'Spot deleted' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal server error' })
  }
}
