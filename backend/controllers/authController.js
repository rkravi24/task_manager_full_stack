const User = require('../models/User');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = await User.create({ name, email, password });
    req.session.user = { id: user._id, email: user.email };
    res.status(201).json({ msg: "User registered", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    req.session.user = { id: user._id, email: user.email }; 
    res.json({ msg: "Login successful", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ msg: "Logout failed" });
    res.clearCookie('connect.sid');
    res.json({ msg: "Logged out successfully" });
  });
};
