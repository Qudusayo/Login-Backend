const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.json({
        status: 200,
        message: 'Success SUCCESS'
    })
})

module.exports = router;