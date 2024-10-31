import { SeatService } from "../service/SeatService.js";

class SeatController {

    constructor (){
        const seatService = new SeatService()
        this.seatService = seatService
    }

    allocate = async (req ,res)=>{
        const seats = req.params.seats;
        const result = await this.seatService.allocate(seats)
        if(result){
            res.status(201).json(result)
        }else res.status(500).json("Server Error")
    }

    strictAllocate = async (req ,res) =>{
        const seats = req.body.seats 
        const status =req.body.status
        const response = await this.seatService.setSeatStatus(seats,status)
        if(response) res.status(201).json(response);
        else res.status(500).status("Server Error")
    }

    getSeats = async (req ,res) =>{
        const result = await this.seatService.getAllSeats()
        if(result) res.status(201).json(result);
        else res.status(500).status("Server Error")
    }   

    clearAllSeats = async (req,res) =>{
        const result = await this.seatService.clearAllSeats()
        
        if(result){
            res.status(201).json(result)
        } 
        else res.status(500).status("Server Error")
    }
}

export const seatController = new SeatController(); 
