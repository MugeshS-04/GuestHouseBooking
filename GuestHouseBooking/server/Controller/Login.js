const userModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const Loginfunc = async function(req, res) {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", success: false });
        }

        
        const user = await userModel.findOne({ email });

        
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        
        if (!(password == user.password)) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }


        res.status(200).json({ message: "Login successful", success: true, data : user});
    } catch (error) {
        

        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = { Loginfunc };
