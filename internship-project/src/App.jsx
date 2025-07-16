import PassengerForm from "./componentPassenger/PassengerForm";
import ContactForm from "./componentContact/ContactForm";
import "./App.css";          

function App() {
  const passengerCount = 3; // Example: 3 passengers

  return (
    <div className="container">
            <ContactForm/>
      <h1>Passenger Information</h1>

      {[...Array(passengerCount)].map((_, i) => (
        <PassengerForm key={i} index={i} />
      ))}
    </div>
  );
}

export default App;
