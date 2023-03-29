import { Reservations } from "./Reservations.js"
import { ReservationForm } from "./ReservationForm.js"

export const TheClowns = () => { // this will be imported into main.js 
    return `
        <div class="page-logo">
            <div class="logo"></div>
            <h1 class="pageName">Buttons and Lollipop, the Clowns</h1>
        </div>
        <section class="reservationForm">
            <h2 class="request">Request a Reservation</h2>
                ${ReservationForm()}
        </section>

        <section class="reservations">
            <h2>Reservations</h2>
                ${Reservations()}
        </section>
    `
}