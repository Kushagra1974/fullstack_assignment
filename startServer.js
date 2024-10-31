import { seatRouter } from "./api/seatRouter.js"
import Seat from "./repository/models/seatModel.js"
import { seatRepository } from "./repository/seatRepository.js"

const init  = async () =>{
    try{
        const len = await Seat.countDocuments()
        if(len !== 84){
            const resp = await seatRepository.generateEmptySeats()
            console.log(resp)
        }
    }catch(err){
        console.log(err)
    }   
}

export const startServer = async (app)=>{
    
    await init()
    app.use("/seats" , seatRouter)
}
