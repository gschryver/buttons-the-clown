import { sendReservation } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const guardianName = document.querySelector("input[name='reservationName']").value
        const childName = document.querySelector("input[name='reservationChild']").value
        const partyAddress = document.querySelector("input[name='reservationAddress']").value
        const numberAttending = document.querySelector("input[name='Attendance']").value
        const partyLength = document.querySelector("input[name='reservationLength']").value
        const partyDate = document.querySelector("input[name='reservationDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            adult: guardianName,
            child: childName,
            address: partyAddress,
            guests: numberAttending,
            length: partyLength,
            date: partyDate,
            completed: false // set completed to false
        }

        // Send the data to the API for permanent storage
        sendReservation(dataToSendToAPI)
        console.log('reservation request sent')
    }
})

export const ReservationForm = () => {
    let html = `
         <div class="field">
            <label class="label" for="reservationName">Legal Guardian's Name</label>
            <input type="text" name="reservationName" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="reservationChild">Child's Name</label>
            <input type="text" name="reservationChild" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="reservationAddress">Address of Party</label>
            <input type="text" name="reservationAddress" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="Attendance">Number of Children Attending</label>
            <input type="number" name="Attendance" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="reservationLength">Length of Reservation (in hours)</label>
            <input type="number" name="reservationLength" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="reservationDate">Date of Reservation</label>
            <input type="date" name="reservationDate" class="inputText" />
        </div>
        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}