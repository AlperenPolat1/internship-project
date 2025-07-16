import PassengerForm from "./componentPassenger/PassengerForm";
import ContactForm from "./componentContact/ContactForm";
import "./App.css";          
import {useState} from "react";

function App() {
  const passengerCount = 3; // Example: 3 passengers

  const [passengerForms, setPassengerForms] = useState(
    Array.from({length: passengerCount}, () => ({
      gender: "",
      name: "",                                         // set for every passenger form.
      surname: "",
      nationality: "Türkiye",
      dob: "",
    }))
  );

  const updatePassengerForm = (index, updatedForm) => {
    setPassengerForms((prevForms) =>
      prevForms.map((form, i) => (i === index ? updatedForm : form))
    );
  };
    const handleSavePassengers = () => {
    console.log("Passenger Forms Data:", passengerForms);
    alert("Passenger data saved to console!");
  };
  return (
    <div className="container">
      <ContactForm/>
      <h1>Passenger Information</h1>
      {passengerForms.map((form, index) => (
        <PassengerForm
          key={index}
          index={index}
          formData={form}
          onFormChange={(updatedForm) => updatePassengerForm(index, updatedForm)}
        />
      ))}
      <div className="button-group">
        <button className="save-button-two" onClick={handleSavePassengers}>
          Save Passengers
        </button>
      </div>
    </div>
  );
}

export default App;