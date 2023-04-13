const db = require('../models');
const Address = db.addresses;
const User = db.users;
const Truck = db.trucks;
const Menu = db.menus;
const Category = db.categories;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

exports.addTruck = (req, res) => {
  if (req.decoded.isAdmin || req.decoded.isVendor === true) {
    Truck.create(req.body)
      .then((data) => {
        res.send({ message: 'Truck added successfully', data: data });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while adding the truck.',
        });
      });
  } else {
    res.status(403).send({ message: 'Not authorised as admin or vendor' });
  }
};

exports.getAllTrucksForAdmin = async (req, res) => {
  try {
    const all_trucks = await Truck.findAll({
      include: {
        model: User,
        as: 'user_info',
        attributes: [
          'id',
          'firstName',
          'lastName',
          'phoneNumber',
          'isDisabled',
          'isVerified',
        ],
      },
    });
    let trucks = all_trucks;
    let approvedTrucks = trucks.filter(
      (truck) => truck.isApproved && !truck.isDisabled
    );
    let pendingTrucks = trucks.filter(
      (truck) => !truck.isApproved && !truck.isDisabled
    );
    let disabledTrucks = trucks.filter((truck) => truck.isDisabled);

    res.status(200).send({
      data: {
        approved: approvedTrucks,
        pending: pendingTrucks,
        disabled: disabledTrucks,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
exports.getAllTrucks = async (req, res) => {
  try {
    const all_trucks = await Truck.findAll({
      include: {
        model: User,
        as: 'user_info',
        attributes: [
          'id',
          'firstName',
          'lastName',
          'phoneNumber',
          'isDisabled',
          'isVerified',
        ],
      },
    });
    let trucks = all_trucks;
    let approvedTrucks = trucks.filter(
      (truck) => truck.isApproved && !truck.isDisabled
    );
    let pendingTrucks = trucks.filter(
      (truck) => !truck.isApproved && !truck.isDisabled
    );
    let disabledTrucks = trucks.filter((truck) => truck.isDisabled);

    res.status(200).send({
      data: {
        approved: approvedTrucks,
        pending: pendingTrucks,
        disabled: disabledTrucks,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getAllTrucksForCustomer = async (req, res) => {
  try {
    let { latitude, longitude, distance } = req?.query;
    const haversine = `(
      6371 * acos(
          cos(radians(${Number(latitude)}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${Number(longitude)}))
          + sin(radians(${Number(latitude)})) * sin(radians(latitude))
      )
  )`;

    const all_trucks = await Truck.findAll({
      attributes: [
        'id',
        'name',
        'photo',
        'latitude',
        'longitude',
        'licenseNo',
        'licensePhotoFront',
        'licensePhotoBack',
        'ratings',
        'joiningDate',
        'updatedAt',
        'user_id',
        'offline',
        'isApproved',
        'isDisabled',
        [sequelize.literal(haversine), 'distance'],
      ],
      where: {
        [Op.and]: [
          sequelize.where(sequelize.literal(haversine), '<=', Number(distance)),
        ],
      },
      order: sequelize.col('distance'),
      include: {
        model: User,
        as: 'user_info',
        attributes: [
          'id',
          'firstName',
          'lastName',
          'phoneNumber',
          'isDisabled',
          'isVerified',
          'address',
        ],
        include: {
          model: Address,
          as: 'addresses',
          attributes: ['pincode', 'city'],
        },
      },
    });
    res.status(200).send({
      data: all_trucks,
    });
  } catch (e) {
    console.log(e, 'maheeee');
    res.status(500).send({
      message: e,
    });
  }
};

exports.getAllTrucksByUser = async (req, res) => {
  const id = req.params.user_id;
  try {
    const truck_data = await Truck.findOne({
      where: {
        user_id: id,
      },
    });
    res.status(200).send({
      data: truck_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getTruckById = async (req, res) => {
  const id = req.params.truck_id;
  try {
    const truck_data = await Truck.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: 'user_info',
        attributes: [
          'firstName',
          'lastName',
          'phoneNumber',
          'isDisabled',
          'isVerified',
        ],
      },
    });
    res.status(200).send({
      data: truck_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getTruckWithMenu = async (req, res) => {
  const id = req.params.truck_id;
  try {
    const truck_data = await Truck.findOne({
      where: {
        id,
        isApproved: true,
      },
      include: [
        {
          model: Menu,
          as: 'menus',
          attributes: [
            'id',
            'name',
            'cost',
            'ratings',
            'review',
            'available',
            'photo',
            'soldCount',
          ],
          include: {
            model: Category,
            as: 'category',
            attributes: ['name', 'id'],
          },
        },
        {
          model: User,
          as: 'user_info',
          attributes: ['phoneNumber', 'firstName', 'lastName', 'email', 'id'],
        },
      ],
    });
    res.status(200).send({
      data: truck_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getTruckWithMenuForMobile = async (req, res) => {
  const id = req.params.truck_id;
  try {
    const truck_info = await Truck.findOne({
      where: {
        id,
        isApproved: true,
      },
      attributes: ['id', 'name'],
    });
    const truck_menu_data = await Category.findAll({
      include: [
        {
          model: Menu,
          as: 'food_info',
          attributes: [
            'truck_id',
            'id',
            'name',
            'cost',
            'ratings',
            'review',
            'available',
            'photo',
            'soldCount',
          ],
          where: {
            truck_id: id,
          },
        },
      ],
    });
    res.status(200).send({
      data: {
        truck_info: truck_info,
        menus: truck_menu_data,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({
      message: e,
    });
  }
};

exports.updateTruck = async (req, res) => {
  if (req.decoded.isAdmin || req.decoded.isVendor === true) {
    const id = req.params.truck_id;
    const updatedData = { ...req.body, updatedAt: new Date() };
    Truck.update(updatedData, {
      where: { id: id },
    })
      .then((num) => {
        if (num >= 1) {
          res.send({ message: 'Truck updated successfully' });
        } else {
          res.status(500).send({
            message: `Cannot update the truck with id=${id}. Maybe the truck was not found or the update request is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating the truck with id=' + id,
        });
      });
  } else {
    res.status(403).send({ message: 'Not authorised as admin or vendor' });
  }
};
