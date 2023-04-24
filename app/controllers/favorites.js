const db = require('../models');
const Favorite = db.favorites;
const Op = db.Sequelize.Op;

exports.addFavorite = async (req, res) => {
  try {
    const { truck_id } = req.body;
    const { user_id } = req.params;

    const existingFavorite = await Favorite.findOne({
      where: {
        [Op.and]: [{ user_id }, { truck_id }],
      },
    });

    if (existingFavorite) {
      res.status(409).send({ message: 'Truck already favorited' });
      return;
    }

    const favorite = await Favorite.create({ user_id, truck_id });

    res.status(201).send({ message: 'Truck favorited', data: favorite });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { truck_id } = req.body;
    const { user_id } = req.params;

    const favorite = await Favorite.findOne({
      where: {
        [Op.and]: [{ user_id }, { truck_id }],
      },
    });

    if (!favorite) {
      res.status(404).send({ message: 'Favorite not found' });
      return;
    }

    await favorite.destroy();

    res.status(200).send({ message: 'Favorite removed' });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

exports.getFavoritesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const favorites = await Favorite.findAll({
      where: { user_id },
      include: { model: db.trucks, as: 'truck' },
    });

    res.status(200).send({ data: favorites });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
