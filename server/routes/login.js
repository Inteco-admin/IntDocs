const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const stateValue = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    req.session.stateValue = stateValue
    const queryParams = new URLSearchParams({
        'client_id': process.env.CLIENT_ID,
        'state': stateValue,
        'response_type': 'code',
        'scope': 'openid all',
        'redirect_uri': process.env.REDIRECT_URL
    })
    req.session.stateValue
    res.redirect(`${process.env.AUTH_URL}?` + queryParams);
});
module.exports = router;
