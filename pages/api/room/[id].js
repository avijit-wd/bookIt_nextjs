import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../controllers/roomController";

dbConnect();

const handler = nc().get(getSingleRoom).put(updateRoom).delete(deleteRoom);

export default handler;
