import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Get all rooms
export const allRooms = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;

  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resPerPage);
  rooms = await apiFeatures.query;

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms,
  });
});

// Create a room
export const createRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(201).json({ success: true, room });
});

// Get single room
export const getSingleRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    res
      .status(404)
      .json({ success: false, error: "Room not found with this id" });
  }

  res.status(201).json({ success: true, room });
});

// Update a room
export const updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    res
      .status(404)
      .json({ success: false, error: "Room not found with this id" });
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({ success: true, room });
});

// Delete a room
export const deleteRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    res
      .status(404)
      .json({ success: false, error: "Room not found with this id" });
  }

  await room.remove();

  res.status(201).json({ success: true, message: "Room is deleted." });
});
