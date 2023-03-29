import { getReservations } from "./dataAccess.js"
import { getClowns } from "./dataAccess.js"
import { deleteReservation } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"

// Select the main container element and get a list of clowns from the server
const mainContainer = document.querySelector("#container")
const clowns = getClowns()

// Add a click event listener to the main container element to handle deletion/denial of reservation requests
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,reservationId] = click.target.id.split("--")
        deleteReservation(parseInt(reservationId))
    }
})


// Add a change event listener to the main container element to handle completion of service requests
mainContainer.addEventListener(
    "change",
    (event) => {
      if (event.target.id === "clowns") {
        const [reservationId, clownId] = event.target.value.split("--") // both arrays will only work if split by --, see below 
        
        const clown = clowns.find((clown) => clown.id === parseInt(clownId)); // add the clown's name to the completed request 
        const completion = {
            reservationId: parseInt(reservationId),
            clownId: parseInt(clownId),
            clownName: clown.name,
            date_created: new Date().toISOString(),
          }
  
        saveCompletion(completion).then(() => {
          // Reload the reservations list after completion is saved
          const reservationHTML = Reservations()
          document.querySelector(".reservationList").innerHTML = reservationHTML
        })
      }
    }
  )
  

// Define a function to convert a single reservation request object to HTML list item element
const convertRequestToListElement = (reservation) => {
    // practicing ternary operators
    // if true, execute between the ? and the : 
    // if false, anything after : is executed
    // e.g. clownName without a ternary operator is as follows:
    /* let clownName = "";
          if (reservation.completed) {
              clownName = reservation.completedBy;
         } else {
              clownName = "";
        } */
    const completedClass = reservation.completed ? "completed" : "" // Is the request completed? If so, add the "completed" class to the request's HTML element, otherwise leave it empty
    const clownName = reservation.completed ? reservation.completedBy : "" // Get the clown's name who completed the request, if completed
    const clownSelect = reservation.completed ? "" : // If request is completed, this will remove the clown dropdown. Otherwise, keep it 
    
        `<select class="clowns" id="clowns">
           <option value="">Choose</option>
           ${clowns.map((clown) =>`<option value="${reservation.id}--${clown.id}">${clown.name}</option>`).join("")}
         </select>`
    return `<li class="reservationItem ${completedClass}">
              <div class="reservationText">${reservation.adult}</div>
              <div class="clowns-and-delete">
                <div class="reservationDate">${reservation.date}</div>
                <div class="completedBy">${clownName}</div>
                ${clownSelect}
                <button class="reservation__delete" id="request--${reservation.id}">Deny</button>
              </div>
            </li>`
  }

  
// Define the main Reservations component function, which returns the HTML for the reservation request list and clown selection dropdown
export const Reservations = () => {
    const reservations = getReservations()

    // if you write a function named convertRequestToListElement, then you would update the code below to the following...
    // Generate the HTML for the reservation request list and clown selection dropdown
    const reservationHTML = `
    
    <ul class="reservationList">
    <li class="reservationTitle"><span class="descriptionTitle">Reservation Name:</span><span class="completedTitle">Assigned To:</li>
    ${reservations.map(convertRequestToListElement).join("")}
    </ul>`

    return reservationHTML
}
