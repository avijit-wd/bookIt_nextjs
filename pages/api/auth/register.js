import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";

import { registerUser } from "../../../controllers/authController";

dbConnect();

const handler = nc({ onError }).post(registerUser);

export default handler;
