const db = require("../models");
const Status = db.statuses;
const Order = db.orders;
const Op = db.Sequelize.Op;

// -------------------------------------Add status-----------------------------------------------------

exports.addStatus = (req, res) => {

    Status.create(req.body)
        .then(data => {
            res.send({ message: 'Status generated', data: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while generating status."
            });
        });
}
// --------------------------------------Find status  by status ID------------------------------------------

exports.getStatusById = async (req, res) => {
    const id = req.params.status_id;
    try {
        const status_data = await Status.findOne({
            where: {
               id: id
            },
            include: {
                model: Order,
                as: 'order_info',
                attributes: ['cost', 'quantity', 'status']
            }
        })
        res.status(200).send({
            data: status_data
        })
    } catch (e) {
        res.status(500).send({
            message: e
        });
    }
    // console.log(req)
}

// -------------------------------------Now status by order Id---------------------------------------------
exports.getStatusByOrder = async (req, res) => {
    const id = req.params.order_id;
    try {
        const status_data = await Status.findAll({
            where: {
                order_id: id
            },
        })
        res.status(200).send({
            data: status_data
        })
    } catch (e) {
        res.status(500).send({
            message: e
        });
    }
}

// -------------------------------status update-----------------------------------

exports.updateStatus = async (req, res) => {
    const id = req.params.status_id;
    const updateStatus = {...req.body, updatedAt: new Date()}
    Status.update(updateStatus, {
        where: {id: id}
    }).then(num => {
        if (num >= 1) {
            res.send({ message: 'status updated successfully' });
        } else {
            res.status(500).send({
                message: `Cannot update the status with id=${id}. Maybe the order was not found or the update request is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating the status with id=" + id
        });
    });
}