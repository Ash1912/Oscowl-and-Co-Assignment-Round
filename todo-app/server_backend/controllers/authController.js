const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
        [userId, name, email, hashedPassword],
        (err) => {
            if (err) return res.status(500).json({ message: 'Signup failed' });
            res.json({ message: 'User registered successfully' });
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) return res.status(404).json({ message: 'User not found' });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
