const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'Some secret here';

const Auth = require('./auth-model');
const { checkUsernameExist, checkUsernameNotExist, checkPayload } = require('./auth-middleware');


router.post('/register', checkPayload, checkUsernameExist, async (req, res, next) => {
    try {
        let user = req.body;

        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(user.password, rounds);

        user.password = hash;

        await Auth.add(user)
            .then(([saved]) => {
                res.status(201).json(saved);
            })
            .catch(next)
    }

    catch (err) {
        next(err)
    }
});

router.post('/login', checkPayload, checkUsernameNotExist, async (req, res, next) => {
    try {
        let { username, password } = req.body;
        await Auth.findBy({ username })
            .then(([user]) => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = generateToken(user);
                    res.status(200).json({
                        message: `welcome back ${user.username}`,
                        token
                    })
                }
                else {
                    res.status(401).json({ message: 'Invalid Credentials' })
                }
            })
    }
    catch (err) {
        next(err)
    }
});

router.post('/logout', (req,res,next) => {
    res.status(200).json({ message: 'Logging you out!'})
})


function generateToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
    };

    const options = {
        expiresIn: '1d',
    };

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        options
    )

    return token
}


module.exports = router;