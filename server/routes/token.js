const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.token);
    if (!req.session.token || !req.session.token) {
        res.status(404).send('no found')

    } else {
        const payload = {
            token: req.session.token,
            refresh: req.session.refresh,
        }


        res.json(payload)
    }

})

module.exports = router