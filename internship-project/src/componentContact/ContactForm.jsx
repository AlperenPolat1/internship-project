import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    repeatEmail: "",
    countryCode: "+90",
    phone: "",
    country: "",
    city: "",
    address: "",
    zip: "",
    participation: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  const [participating, setParticipating] = useState(false);

  const handleParticipantClick = () => {
    setParticipating((prev) => !prev); // toggle true/false
  };
  const handleSave = () => {
  const requiredFields = [
    "name",
    "surname",
    "email",
    "repeatEmail",
    "country",
    "city",
    "address",
    "zip",
    "phone"
  ];

  const allFilled = requiredFields.every((field) => form[field].trim() !== "");                 // error if they are empty

  if (!allFilled) {
    alert("Please fill in all required contact fields before saving.");         //error message
    return;
  }

  if (form.email !== form.repeatEmail) {
    alert("Email and repeat email must match.");             // email check. 
    return;
  }

  console.log("Contact form saved:", form);                //classic console output
  alert("Contact info saved!");
};


  return (
    <section className="contact">         
      <h2>Contact Information</h2>

      {/* Row 1: Name & Surname */}
      <div className="row">
        <div className="field half">
          <label className="label">
            Name <span className="required">*</span>
          </label>
          <input
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="field half">
          <label className="label">
            Surname <span className="required">*</span>
          </label>
          <input
            name="surname"
            placeholder="Enter surname"
            value={form.surname}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 2: Email & Repeat Email */}
      <div className="row">
        <div className="field half">
          <label className="label">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="field half">
          <label className="label">
            Repeat Email <span className="required">*</span>
          </label>
          <input
            type="email"
            name="repeatEmail"
            placeholder="Repeat email"
            value={form.repeatEmail}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 3: Phone Number & Country */}
      <div className="row">
        <div className="field half phone-group">
          <label className="label">
            Phone Number <span className="required">*</span>
          </label>
          <div className="phone-input-wrapper">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="phone-select"
            >
              <option value="+90">+90 (TR)</option>
              <option value="+1">+1 (US)</option>
              <option value="+49">+49 (DE)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              className="phone-input"
            />
          </div>
        </div>

        <div className="field half">
          <label className="label">
            Country <span className="required">*</span>
          </label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Select a country</option>
            <option value="Türkiye">Türkiye</option>
            <option value="Germany">Germany</option>
            <option value="Netherlands">Netherlands</option>
            <option value="France">France</option>
            <option value="Sweden">Sweden</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
          </select>
        </div>
      </div>

      {/* Row 4: City, Address, Zip */}
      <div className="row">
        <div className="field third">
          <label className="label">
            City <span className="required">*</span>
          </label>
          <input
            name="city"
            placeholder="Enter city"
            value={form.city}
            onChange={handleChange}
          />
        </div>
        <div className="field third">
          <label className="label">
            Address <span className="required">*</span>
          </label>
          <input
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="field third">
          <label className="label">
            Zip Code <span className="required">*</span>
          </label>
          <input
            name="zip"
            placeholder="Enter zip code"
            value={form.zip}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 5: Save Button */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button onClick={handleSave} className="save-button">
          Save Contact Info
        </button>
      </div>

      {/* Row 6: Participant Info + Button */}
     <div className="participation-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={participating}
            onChange={handleParticipantClick}
          />
          I am participating in the journey myself.
        </label>
      </div>
    </section>
  );
}
