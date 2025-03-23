import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const users = [
    { username: "admin", password: "password123" },
    { username: "lakshmi", password: "lakshmi123" }
];

export const loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};
