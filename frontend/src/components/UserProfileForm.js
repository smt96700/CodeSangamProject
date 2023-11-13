import { useState } from "react";
// import { useProfileContext } from '../hooks/useProfileContext'
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
function UserProfileForm() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [contactNumber, setContactNumber] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const email = user ? user.email : '';
  const { dispatch } = useAuthContext();
  const navigate= useNavigate();
  //including dispatch fun
  // const {dispatch} = useProfileContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside handle submit");
    const profileInfo = {
      name,
      dateOfBirth,
      gender,
      contactNumber,
      currency,
      monthlySalary,
      monthlyExpense,
      country,
      state,
      city,
      email,
    };
    console.log(gender);
    console.log(profileInfo);

    const response = await fetch("/api/profile/createProfile", {
      method: "POST",
      body: JSON.stringify(profileInfo),
      headers: {
        "Content-Type": "application/json", //to specify that the data is in json format
      },
    });
    console.log(response);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(json.emptyFields);
    }
    if (response.ok) {
      console.log("Error h");
      setName("");
      setDateOfBirth("");
      setGender("");
      setContactNumber("");
      setCurrency("");
      setMonthlyExpense(0);
      setMonthlySalary(0);
      setCity("");
      setCountry("");
      setState("");
      setEmptyFields([]);
      setError(null);

      console.log("profile added");
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);

      // Update the 'isBool' property
      user.isFilledUserProfile = true;

      // Save the updated user object back to local storage
      localStorage.setItem("user", JSON.stringify(user));
      const data= JSON.parse(localStorage.getItem('user'));
      dispatch({type:"LOGIN", payload: data});
      navigate('/login')
      // dispatch({type : 'PROFILEADDED'})
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add some Info</h3>

        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          className={emptyFields.includes("dateOfBirth") ? "error" : ""}
        />

        <label>Gender:</label>
        <select
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          className={emptyFields.includes("gender") ? "error" : ""}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Contact Number:</label>
        <input
          type="text"
          onChange={(e) => setContactNumber(e.target.value)}
          value={contactNumber}
          className={emptyFields.includes("contactNumber") ? "error" : ""}
        />

        <label>Currency:</label>
        <input
          type="text"
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
          className={emptyFields.includes("currency") ? "error" : ""}
        />

        <label>Monthly Salary:</label>
        <input
          type="number"
          onChange={(e) => setMonthlySalary(e.target.value)}
          value={monthlySalary}
          className={emptyFields.includes("monthlySalary") ? "error" : ""}
        />

        <label>Expected Monthly Expense:</label>
        <input
          type="number"
          onChange={(e) => setMonthlyExpense(e.target.value)}
          value={monthlyExpense}
          className={emptyFields.includes("monthlyExpense") ? "error" : ""}
        />

        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          className={emptyFields.includes("country") ? "error" : ""}
        />

        <label>State:</label>
        <input
          type="text"
          onChange={(e) => setState(e.target.value)}
          value={state}
          className={emptyFields.includes("state") ? "error" : ""}
        />

        <label>City:</label>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className={emptyFields.includes("city") ? "error" : ""}
        />

        <button>Add Profile</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}

export default UserProfileForm;
