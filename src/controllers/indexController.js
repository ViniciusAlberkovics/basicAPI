exports.get = (req, res) => {
    res.json({ message: `So it works? \n Date: ${new Date().toLocaleString()}` });
};