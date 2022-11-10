const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const qs = require("query-string");

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};
const url = process.env.TOKEN_URL;

router.get("/", (req, res) => {
    // State from Server
    const stateFromServer = req.query.state;
    console.log('query: ' + stateFromServer)
    console.log('session: ' + req.session.stateValue)
    // debugger
    if (stateFromServer !== req.session.stateValue) {
        console.log("State doesn't match. uh-oh.");
        console.log(`Saw: ${stateFromServer}, but expected: &{req.session.stateValue}`);
        res.redirect(302, '/');
        return;
    }
    //post request to /token endpoint
    axios
        .post(
            url,
            qs.stringify({
                grant_type: "authorization_code",
                code: req.query.code,
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
            res.redirect(process.env.FRONT_URL);
        })
        .catch((err) => {
            console.error(err);
        });
});
module.exports = router;