import { Spot } from './model.js'

function getSchemaDescription(schema) {
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
    await Spot.create({ ...req.body })
    res.status(201).send({ message: 'Spot created' })
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
