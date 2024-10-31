import Seat from "./models/seatModel.js";

class SeatRepository{

    static #isInternalConstructing = false;

    constructor(){
        if (!SeatRepository.#isInternalConstructing) {
            throw new TypeError("PrivateConstructor is not constructable");
        }
        SeatRepository.#isInternalConstructing = false;
    }

    
    static createInstance = async () =>{
        SeatRepository.#isInternalConstructing = true;
        const instance =  new SeatRepository()
        return instance;
    }
    
     
    generateEmptySeats = async ()=>{
        const seats = Array.from({ length: 84 }, (_, index) => ({
            seatNumber: index + 1,
            Occupied: false
        }));
        try{
            await Seat.insertMany(seats);
        }catch(err){
            console.log(err)
        }
        
    }

    getAllSeats = async () => {
        try{
            const result = await Seat.find();
            return result
        }
        catch(err){
            console.log(err);
            return null
        }
    }

    changeStatusOfSeats = async  (seats ,status) => {
        try{
            await Seat.updateMany(
                { seatNumber: { $in: seats } }, 
                { $set: { Occupied: status } }          
            );

            return await this.getAllSeats()
        }
        catch(err){
            console.log(err)
            return null
        }   
    }

    clearAllSeats = async () =>{
        const seat = Array.from({ length: 84 }, (_, i) => i + 1);
        return await this.changeStatusOfSeats(seat , false);
    }
}


export const seatRepository = await SeatRepository.createInstance()
