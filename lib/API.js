'use strict';

const request = require('request');

const  config = require('../config')

class API {
    static publishContent(req, linkedinId, content) {
        const url = 'https://api.linkedin.com/v2/shares';
        const { title, text, shareUrl, shareThumbnailUrl } = content;
        const body = {
            owner: 'urn:li:person:' + linkedinId,
            subject: title,
            text: {
                text: text
            },
            content: {
                contentEntities: [{
                    entityLocation: shareUrl,
                    thumbnails: [{
                        resolvedUrl: shareThumbnailUrl
                    }]
                }],
                title: title
            },
            distribution: {
                linkedInDistributionTarget: {}
            }
        };
        const headers = {
            'Authorization': 'Bearer ' + req.session.token,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
            'x-li-format': 'json'
        };

        return new Promise((resolve, reject) => {
            request.post({ url: url, json: body, headers: headers}, (err, response, body) => {
                if(err) {
                    reject(err);
                }
                resolve(body);
            });
        });

    }

    static getLinkedinId(req) {
        return new Promise((resolve, reject) => {
            const url = 'https://api.linkedin.com/v2/me';
            const headers = {
                'Authorization': 'Bearer ' + req.session.token,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0' 
            };

            request.get({ url: url, headers: headers }, (err, response, body) => {
                if(err) {
                    reject(err);
                }
                resolve(JSON.parse(body).id);
            });
        });
    }

    static getAccessToken(req) {
        const { code } = req.query;
        const body = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: config.linkedinAuth.callbackURL,
            client_id: config.linkedinAuth.clientID,
            client_secret: config.linkedinAuth.clientSecret
        };
        return new Promise((resolve, reject) => {
            request.post({url: config.linkedinAuth.accessTokenURL, form: body }, (err, response, body) =>
        { 
            if(err) {
                reject(err);
            }
            resolve(JSON.parse(body));
        }
        );
        });
    }

    static getAuthorizationUrl() {
        const state = Buffer.from(Math.round( Math.random() * Date.now() ).toString() ).toString('hex');
        const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
        const url = `${config.linkedinAuth.authorizationURL}?response_type=code&client_id=${config.linkedinAuth.clientID}&redirect_uri=${encodeURIComponent(config.linkedinAuth.callbackURL)}&state=${state}&scope=${scope}`;
        return url;
    }
}

module.exports = API;