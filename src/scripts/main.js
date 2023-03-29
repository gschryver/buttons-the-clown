import { fetchReservations } from "./dataAccess.js"
import { fetchClowns} from "./dataAccess.js"
import { fetchCompletions } from "./dataAccess.js"
import { TheClowns } from "./TheClowns.js"

const mainContainer = document.querySelector("#container")

// what is this doing? 
// .then() tells javascript what to do after information has been received
const render = () => { 
  fetchReservations() // this fetches reservation requests from the server
      .then(() => fetchClowns()) // fetches clowns from server
      .then(() => fetchCompletions()) // fetches completions from server
      .then( // render the main clown page component inside of the main container 
          () => {
              mainContainer.innerHTML = TheClowns()
          }
      )
}

render()

mainContainer.addEventListener("stateChanged", () => {
  render()
})