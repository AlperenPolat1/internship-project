import { useState, useEffect } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    repeatEmail: "",
    countryCode: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    zip: "",
    participation: false,
    phoneCode : "",
  });
  const [showErrors, setShowErrors] = useState(false);       

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "phone") {                                      // if statement to make phone number only number type.
    const numericValue = value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, [name]: numericValue }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
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
      "phone",
      "phoneCode"
    ];

    const allFilled = requiredFields.every((field) => form[field].trim() !== "");           //emptiness check

    // Set showErrors to true so that validation messages are displayed.
    setShowErrors(true);

    

    if (form.email !== form.repeatEmail) {                             //matching alert
      alert("Email and repeat email must match.");
      return;
    }
    if (allFilled){                                                  //if all of them is filled then we can save.
      console.log("Contact form saved:", form);
      alert("Contact info saved!");
    }
    
  };

  // Function to conditionally show error messages.
  const error = (field) =>
    showErrors && (!form[field] || form[field].trim() === "");

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
          {error("name") && <p className="error">Name is required</p>}
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
          {error("surname") && <p className="error">Surname is required</p>}
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
          {error("email") && <p className="error">Email is required</p>}
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
          {error("repeatEmail") && <p className="error">Repeat Email is required</p>}
        </div>
      </div>

      {/* Row 3: Phone Number & Country */}
<div className="row">
  <div className="field half">
    <label className="label">
      Phone Number <span className="required">*</span>
    </label>
    <div className="phone-input-wrapper" style={{ display: "flex", gap: "8px" }}>
      <select
        name="countryCode"
        value={form.countryCode}
        onChange={handleChange}
        className="phone-code"
      >
        <option value="">Code</option>
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
        className="phone-number"
      />
       
    </div>     {/* I used and-or to make it one line for every error otherwise I have to show 2 error message */}
    {(error("phone") || error("countryCode")) && <p className="error">Code and Phone number is required</p>}        

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
    {error("country") && <p className="error">Country is required</p>}
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
          {error("city") && <p className="error">City is required</p>}
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
          {error("address") && <p className="error">Address is required</p>}
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
          {error("zip") && <p className="error">Zip Code is required</p>}
        </div>
      </div>

      {/* Save Button */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button onClick={handleSave} className="save-button">
          Save Contact Info
        </button>
      </div>

      {/* Participation Checkbox */}
      <div className="participation-row">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.participation}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, participation: e.target.checked }))
            }
          />
          I am participating in the journey myself.
        </label>
      </div>
    </section>
  );
}
