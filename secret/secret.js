module.exports = {
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    },
    facebook: {
        clientID: '457977245506581',
        clientSecret: '15a41328b67b0c7be3bf65537da0036d',
        profileFields: ['email', 'displayName'],
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true
    }
}