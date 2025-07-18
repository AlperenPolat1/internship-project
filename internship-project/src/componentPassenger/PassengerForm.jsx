import { useState, useEffect } from "react";

export default function PassengerForm({ index, formData, onFormChange, showErrors }) {
  const [form, setForm] = useState(formData);

  // Keep the local form state in sync if formData changes from the parent.
  useEffect(() => {
    setForm(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      // Auto-format DOB: DD/MM/YYYY while removing non-digit characters.

      let formatted = value.replace(/\D/g, "");
      if (formatted.length > 2 && formatted.length <= 4) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
      } else if (formatted.length > 4) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}/${formatted.slice(4, 8)}`;
      }
      const updatedForm = { ...form, [name]: formatted };
      setForm(updatedForm);
      onFormChange(updatedForm);
    } else {
      const updatedForm = { ...form, [name]: value };
      setForm(updatedForm);
      onFormChange(updatedForm);
    }
  };

  // Only show errors if "showErrors" is true.
  const error = (field) =>
    showErrors && (!form[field] || form[field].trim() === "");

  // For date of birth, also ensure the length is exactly 10 characters (DD/MM/YYYY).
  const dobError = showErrors && form.dob.trim().length !== 10;

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
              type="radio"
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
          <input
            name="name"
            placeholder="Name"
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
            placeholder="Surname"
            value={form.surname}
            onChange={handleChange}
          />
          {error("surname") && <p className="error">Surname is required</p>}
        </div>
      </div>

      {/* Nationality & Date of Birth */}
      <div className="row">
        <div className="field half">
          <label className="label">
            Nationality <span className="required">*</span>
          </label>
          <select name="nationality" value={form.nationality} onChange={handleChange}>
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
          {error("nationality") && <p className="error">Nationality is required</p>}
        </div>

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
          {dobError && (
            <p className="error">Please enter a valid date (DD/MM/YYYY)</p>
          )}
        </div>
      </div>
    </section>
  );
}

// Static validation function used in App.
PassengerForm.isValid = (form) => {
  return (
    form.gender.trim() !== "" &&
    form.name.trim() !== "" &&
    form.surname.trim() !== "" &&
    form.nationality.trim() !== "" &&
    form.dob.trim().length === 10
  );
};
