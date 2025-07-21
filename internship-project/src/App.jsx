import { useState } from "react";
import PassengerForm from "./componentPassenger/PassengerForm";
import ContactForm from "./componentContact/ContactForm";
import "./App.css";

function App() {
  const passengerCount = 3; // Example: 3 passengers or we can create for every passenger.

  const [passengerForms, setPassengerForms] = useState(
    Array.from({ length: passengerCount }, () => ({
      gender: "",
      name: "",
      surname: "",
      nationality: "",
      dob: "",
    }))
  );

  // This flag tells the PassengerForm components to show errors and inital is false 
  const [showPassengerErrors, setShowPassengerErrors] = useState(false);

  const updatePassengerForm = (index, updatedForm) => {
    setPassengerForms((prevForms) =>
      prevForms.map((form, i) => (i === index ? updatedForm : form))
    );
  };

  const handleSavePassengers = () => {
           setShowPassengerErrors(true);                                              // When we are saving, show errors in the passenger forms.
    

    const allValid = passengerForms.every((form) =>
      PassengerForm.isValid(form)
    );

    
    
    if (allValid){
    console.log("Passenger Forms Data:", passengerForms);
    alert("Passenger data saved!");}

  };

  return (
    <div className="container">
      <ContactForm />
      <h1>Passenger Information</h1>
      {passengerForms.map((form, index) => (                  // every passenger is seperate 
        <PassengerForm
          key={index}
          index={index}
          formData={form}
          onFormChange={(updatedForm) => updatePassengerForm(index, updatedForm)}
          showErrors={showPassengerErrors}
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
