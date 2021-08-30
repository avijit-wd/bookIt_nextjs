import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
  allRooms,
  createRoom,
  getSingleRoom,
} from "../../../controllers/roomController";
import onError from "../../../middlewares/errors";

dbConnect();

const handler = nc({ onError }).get(allRooms).post(createRoom);

export default handler;
