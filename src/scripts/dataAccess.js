const applicationState = { // current state of app
    reservations: [],
    completions: [],
    clowns: [
        { id: 1, name: "Buttons" },
        { id: 2, name: "Lollipop" }
    ]
}

const API = "http://localhost:8088"

// THIS MUST BE DEFINED 
const mainContainer = document.querySelector("#container")

// FETCH RESERVATIONS 
// retrieves all of the reservations from API and stores them in application.reservations  
export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (partyReservations) => {
                // Store the external state in application state
                applicationState.reservations = partyReservations
            }
        )
}

// GET RESERVATION
// returns a copy of the application.reservation array (based on completed status)
export const getReservations = () => {
    const reservations = [...applicationState.reservations];
    // Sort reservations by ascending order & date by ascending order 
        // sort completed status first, and if two reservations have the same status, sort by date instead 
    return reservations.sort((resA, resB) => resA.completed - resB.completed || new Date(resA.date) - new Date(resB.date));  // or (if the first thing is not truthy, look at the second thing)
  }
  
  

// GET CLOWNS 
// returns a copy of the applicationState.clowns array 
export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}

// SEND RESERVATION 
// sends a reservation request to the API with the data?
export const sendReservation = (userReservationRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userReservationRequest)
    }

    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
} 

// DELETE RESERVATION
// deletes reservation request with ID from the API 
export const deleteReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// GRAB OUR CLOWNS
// retrieves our clowns from API and stores them in an array 
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}

// SAVE COMPLETIONS
// sends completed/accepted reservation to the API, updates completed status on related reservation 
export const saveCompletion = (completion) => {
    // Prepare options for sending data to the server
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion) // Convert the completion data to a JSON string
    }

    // Send the completion data to the server
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json()) 
        .then(() => {
            // Get the reservation that corresponds to the completion data
            return fetch(`${API}/reservations/${completion.reservationId}`)
                .then(response => response.json()) // Convert the response data to an object
                .then(reservation => {
                    
                    // Set the 'completed' status of the reservation to true for sorting purposes
                    // This can be built upon to add various things to the requests/displayed HTML ul
                    reservation.completed = true;
                    reservation.completedBy = completion.clownName; 

                    const updateOptions = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(reservation) 
                    };
                    
                    return fetch(`${API}/reservations/${completion.reservationId}`, updateOptions)
                        .then(response => response.json()) 
                        .then(() => {
                            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
                        });
                });
        });
}; 


// FETCH COMPLETIONS
// fetches all of the completed reservation requests and stores them in an array 
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
            }
        )
}