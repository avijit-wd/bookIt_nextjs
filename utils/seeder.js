const Room = require("../models/room");
const rooms = require("../data/rooms.json");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://avijitb440:avijit@440@cluster0.4uvwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");
    await Room.insertMany(rooms);
    console.log("All rooms are added");
    process.exit(1);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedRooms();
