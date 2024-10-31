import { seatRepository } from "../repository/seatRepository.js"

export class SeatService {

    allocate = async (seat)=>{
        seat = Number(seat)
        let allocatedSeats = await seatRepository.getAllSeats() 
        allocatedSeats = allocatedSeats
          .filter(seat => seat.Occupied) 
          .map(seat => seat.seatNumber);  
        if(allocatedSeats.length ==0){
            let allotedSeats = []
            for(let i=1;i<=seat;i++){
              allotedSeats.push(i);
            }
            return await this.setSeatStatus (allotedSeats ,true);
          }
      
          // generate the matrix to represent the seats 
          // it is 10 * 7 in size 
          let train = Array(12).fill(null).map(() => Array(7).fill(0));
      
      
          //filing the matrix to indicate the occupied seat
          for(let i =0;i<allocatedSeats.length;i++){
            let filledSeat = allocatedSeats[i] -1;  
            let x = Math.floor(filledSeat/7);
            let y = Math.floor(filledSeat%7);
      
            train[x][y] = 1;
          }
          //calculating if the requested seat can be allocated in the same row
       
          for(let i=0;i<12;i++){
            let vacantSeatCount = 0;
            let vacantSeat =[]
            for(let j=0;j<7;j++){
              
              // To remove the extra seat in the train which is seat number 
              if(i===11 && j > 2) continue; 
              
              if(train[i][j] === 0) {
                vacantSeatCount++
                let seatNumber = i * 7 + j+1
                vacantSeat.push(seatNumber)
              }
      
              if(vacantSeatCount >= seat){
                const seatStatus =  [...allocatedSeats, ...vacantSeat.slice(0, seat)].sort((a,b)=>a-b)
                return await this.setSeatStatus(seatStatus , true);
              }
      
            }
          }
          // console.log("train" ,train)
          let nearestSeat  = []
          let sum =0;
          let smallestDist = 1e7
          let nearestSeatAlloted  = []
          for(let i=0;i<12;i++){
            for(let j=0;j<7;j++){
      
              if(i===11 && j > 2) continue; 
              if(train[i][j]  === 0){
                nearestSeat = [...nearestSeat , [i,j]]
                sum = sum + i + j;
                if(nearestSeat.length === seat){
                  let avgDist = 0;
                  let n = nearestSeat.length
                  for(let k =0;k<n ;k++){
                    for(let l =k+1;l<n;l++){
                      let p1 = nearestSeat[k];
                      let p2 = nearestSeat[l];

                      let dist = Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
                      avgDist += dist;
                    }
                  }
                  avgDist = avgDist/n;

                  if(smallestDist > avgDist){
                    smallestDist = avgDist
                    nearestSeatAlloted = [...nearestSeat];
                  }
                  sum = sum - nearestSeat[0][0] - nearestSeat[0][1];
                  nearestSeat.shift()
                }
              }
            }
          }
          let output = []
          console.log("nearestseat" , nearestSeatAlloted)
          for(let i=0;i<nearestSeatAlloted.length ;i++){
            let seat = nearestSeatAlloted[i]
            let num = seat[0]*7 + seat[1] +1 ;
            output.push(num);
          }
        const seatStatus  =  [...allocatedSeats , ...output].sort((a,b)=>a-b);
        console.log("last" , output)
        return await this.setSeatStatus(seatStatus , true);
    }

    setSeatStatus = async (nums ,status) =>{
        return await seatRepository.changeStatusOfSeats(nums ,status)
    }

    getAllSeats = async () => {
        return await seatRepository.getAllSeats()
    }

    clearAllSeats = async () =>{
      return await seatRepository.clearAllSeats()
    }
}
