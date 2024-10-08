import { Spot } from './model.js'

function getSchemaDescription(schema) {
  return Object.keys(schema.paths).reduce((description, key) => {
    const path = schema.paths[key]
    const fieldDescription = {
      type: path.instance,
      required: !!path.isRequired,
      unique: !!path.options.unique,
      ref: path.options.ref || null
    }

    if (path.instance === 'Array' && path.caster && path.caster.instance) {
      fieldDescription.itemsType = path.caster.instance
    }

    description[key] = fieldDescription
    return description
  }, {})
}

export const getSpots = async (req, res) => {
  try {
    const spots = await Spot.find()
    res.send(spots)
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal server error')
  }
}

export const getSpotSchema = async (req, res) => {
  try {
    const schemaDescription = getSchemaDescription(Spot.schema)
    res.send(schemaDescription)
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal server error')
  }
}

export const getOneSpot = async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id)
    res.send(spot)
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal server error')
  }
}

export const createSpot = async (req, res) => {
  try {
    await Spot.create({ ...req.body })
    res.status(201).send('Spot created')
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal server error')
  }
}

export const updateSpot = async (req, res) => {
  try {
    await Spot.updateOne({ _id: req.body.id }, { ...req.body })
    res.status(200).send('Spot updated')
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal server error')
  }
}

export const deleteSpot = async (req, res) => {
  try {
    await Spot.deleteOne({ _id: req.body.id })
    res.status(200).send('Spot deleted')
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal server error')
  }
}
