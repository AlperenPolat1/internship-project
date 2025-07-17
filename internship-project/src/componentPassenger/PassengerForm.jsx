import { useState } from "react";

export default function PassengerForm({ index, formData, onFormChange }) {
  const [form, setForm] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm;
    
    if (name === "dob") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length > 2 && formatted.length <= 4) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;          // We made it easier for the user to get DOB input.
      } else if (formatted.length > 4) {                                        // it is using slashes after every 2 digits.
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(
          2,
          4
        )}/${formatted.slice(4, 8)}`;
      }
      const updatedForm = { ...form, [name]: formatted };
      setForm(updatedForm);                                                         //updating that form 
      onFormChange(updatedForm);
    } else {
      const updatedForm = { ...form, [name]: value };
      setForm(updatedForm);
      onFormChange(updatedForm);
    }
  };
  PassengerForm.isValid = (form) => {
    return (
      form.gender.trim() !== "" &&                             // error if it is empty.
      form.name.trim() !== "" &&
      form.surname.trim() !== "" &&
      form.nationality.trim() !== "" &&
      form.dob.trim().length === 10                                // DD/MM/YYYY
    );
  };

  const error = (field) => form[field].trim() === "";

  return (
    <section className="passenger">
      <h3>{index + 1}. Adult (12+)</h3>

      {/* Gender */}
      <div className="field">
        <label className="label">
          Gender <span className="required">*</span>
        </label>
        <div className="radio-group">
          <label>
            <input
              type="radio"                                                                        //gender radio 
              name={`gender-${index}`} 
              checked={form.gender === "Male"}
              value="Male" 
               onChange={(e) =>
                handleChange({ target: { name: "gender", value: e.target.value } })
              }
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name={`gender-${index}`}
              value="Female"
              checked={form.gender === "Female"}
              onChange={(e) =>
                handleChange({ target: { name: "gender", value: e.target.value } })
              }
            />
            Female
          </label>
        </div>
        {error("gender") && <p className="error">Gender is required</p>}
      </div>

      {/* Name & Surname */}
      <div className="row">
        <div className="field half">
          <label className="label">
            Name <span className="required">*</span> 
          </label>                                                   
          <input name="name"
          placeholder="Name"
           value={form.name}
            onChange={handleChange} />                           
          {error("name") && <p className="error">Name is required</p>}         
        </div>                                                                                  

        <div className="field half">
          <label className="label">
            Surname <span className="required">*</span>
          </label>
          <input name="surname"
          placeholder="Surname"
           value={form.surname} 
           onChange={handleChange} />
          {error("surname") && <p className="error">Surname is required</p>}
        </div>
      </div>

      {/* Nationality & Date of Birth */}
      <div className="row">
        <div className="field half">
          <label className="label">
            Nationality <span className="required">*</span>
          </label>
          <select
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
          >
            <option value="Poland">Poland</option>
            <option value="Sweden">Sweden</option>
            <option value="France">France</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Portugal">Portugal</option>
            <option value="Spain">Spain</option>
            <option value="Denmark">Denmark</option>
            <option value="England">England</option>
            <option value="Türkiye">Türkiye</option>
            <option value="Germany">Germany</option>
          </select>
        </div>
        {error("nationality") && (
          <p className="error">Nationality is required</p>
        )}

        <div className="field half">
          <label className="label">
            Date of Birth <span className="required">*</span>
          </label>
          <input
            name="dob"
            value={form.dob}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
          />
          {error("dob") && (
            <p className="error">Please enter a valid date (DD/MM/YYYY)</p>
          )}
        </div>
      </div>
    </section>
  );
}
