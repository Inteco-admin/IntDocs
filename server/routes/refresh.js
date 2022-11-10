const express = require("express");
const router = express.Router();
const axios = require('axios');
const qs = require("query-string");

router.get('/', (req, res) => {
    const refresh = req.query.refresh
    const url = process.env.TOKEN_URL
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    axios
        .post(
            url,
            qs.stringify({
                refresh_token: refresh,
                grant_type: "refresh_token",
                client_id: process.env.CLIENT_ID,
                redirect_uri: process.env.REDIRECT_URL,
            }),
            config
        )
        .then((result) => {

            // save token to session
            req.session.token = result.data.access_token;
            req.session.refresh = result.data.refresh_token;
            console.log('auth:' + req.session.token + ' refresh: ' + req.session.refresh)

            res.cookie('check_auth', 1, { httpOnly: false, maxAge: (result.data.expires_in * 1000) - 20 })
            // console.log(result)
            //redirect to Vue app
            res.json({
                token: req.session.token,
                refresh: req.session.refresh,
            });
        })
        .catch((err) => {
            console.error(err);
        });

})

module.exports = router