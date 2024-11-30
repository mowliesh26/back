
const DataModel = require("../models/visualizemodal");

exports.saveData = async (req, res) => {
  const { name, email, phone, location, date } = req.body;

  try {
    const newData = new DataModel({
      name,
      email,
      phone,
      location,
      date,
    });

    await newData.save();
    res.status(201).send("Data saved successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving data.");
  }
};
