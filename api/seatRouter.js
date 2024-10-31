import { Router } from "express";
import { seatController } from "./SeatController.js";

export const seatRouter = Router()

seatRouter.get("/allocate/:seats" , seatController.allocate)
seatRouter.get("/",seatController.getSeats)
seatRouter.post("/strictAllocate" , seatController.strictAllocate)
seatRouter.get("/clear" ,seatController.clearAllSeats)


