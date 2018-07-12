const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../config/models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// @route GET api/items/:id
// @desc Get an item by id
// @access Public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json({success: false}))
});

// @route POST api/items
// @desc  create an item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item));
});

// @route Delete api/items
// @desc delete item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
    
});

// @route Update api/items
// @desc update item
// @access Public
router.put('/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, {upsert: true})
        .then(item => {
            Item.findById(req.params.id)
            .then(item => res.json(item))
            .catch(err => res.status(404).json({success: false}))
        })
        .catch(err => res.status(404).json({success: false}));
    
});



module.exports = router;