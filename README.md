# Ex06 BMI Calculator
## Date:

## AIM
To develop a responsive and interactive Body Mass Index (BMI) Calculator using React that allows users to input their height and weight, and calculates their BMI to categorize their health status (e.g., Underweight, Normal, Overweight, Obese).

## DESIGN STEPS

### STEP 1: Initialize React Project

<li>Create a new React app using create-react-app.</li>
<li>Install React Router using:</li>
npm install react-router-dom

### STEP 2: Set Up Routing

Create routing structure with react-router-dom:

<li>Home route (/) – Intro or Navigation</li>

<li>BMI Calculator route (/bmi)</li>

<li>Result route (/result)</li>

### STEP 3: Design the BMI Form Page

<li>Create a form to accept Height (in cm or m) and Weight (in kg).</li>

<li>On form submit, navigate to the result page with entered values via URL query params or context/state.</li>

## STEP 4: Handle Input Validation

<li>Check if height and weight are valid numbers.</li>

<li>Optionally, show error messages for invalid inputs.</li>

### STEP 5: Perform BMI Calculation

<li>In the result component:

<li>Extract height and weight from the route (URL or passed state).</li>

<li>Apply the BMI formula:</li>

![image](https://github.com/user-attachments/assets/ec785506-c96b-489e-8783-fb1a5d36101a)
​
 
<li>Convert height from cm to m if needed.</li></li>

### STEP 6: Display Result

<li>Show calculated BMI.</li>

<li>Show category based on BMI range:

<li>Underweight, Normal, Overweight, Obese, etc.</li></li>

### STEP 7: Navigation Options

<li>Provide a button to go back to the BMI form to calculate again.</li>

### STEP 8: Enhancements

<li>Add styling using CSS or Tailwind.</li>

## PROGRAM
## app.css
```
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px 80px;
}

.card {
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 45px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.card h1 {
  font-size: 36px;
  color: #222;
  margin-bottom: 20px;
}

.card p {
  color: #555;
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 30px;
}

button {
  border: none;
  background: #667eea;
  color: white;
  padding: 14px 25px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #5568d8;
  transform: translateY(-2px);
}

form {
  display: flex;
  flex-direction: column;
  text-align: left;
}

form label {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

form input {
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  outline: none;
}

form input:focus {
  border-color: #667eea;
}

form button {
  margin-top: 10px;
}

.error {
  color: red !important;
  font-size: 14px !important;
  margin: 0 0 15px !important;
}

.back-link {
  display: inline-block;
  margin-top: 25px;
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
}

.result-card h2 {
  color: #667eea;
  margin-bottom: 25px;
}

.bmi-value {
  font-size: 60px;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
}

.details {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
}

.details p {
  margin: 5px 0;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 14px;
}

@media (max-width: 600px) {
  .card {
    padding: 30px 20px;
  }

  .card h1 {
    font-size: 30px;
  }

  .bmi-value {
    font-size: 48px;
  }

  footer {
    font-size: 12px;
  }
}
```
## app.jsx
```
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <div className="card">
        <h1>BMI Calculator</h1>

        <p>
          Calculate your Body Mass Index and know your
          <br />
          health category.
        </p>

        <Link to="/bmi">
          <button>Start Calculator</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const calculateBMI = (e) => {
    e.preventDefault();

    const h = Number(height);
    const w = Number(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setError("Please enter valid height and weight.");
      return;
    }

    setError("");

    navigate(`/result?height=${h}&weight=${w}`);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>BMI Calculator</h1>

        <form onSubmit={calculateBMI}>
          <label>Height (cm)</label>

          <input
            type="number"
            placeholder="Enter height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <label>Weight (kg)</label>

          <input
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Calculate BMI</button>
        </form>

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>

      <Footer />
    </div>
  );
}

function Result() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const height = Number(params.get("height"));
  const weight = Number(params.get("weight"));

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal Weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return (
    <div className="page">
      <div className="card result-card">
        <h1>Your BMI Result</h1>

        <div className="bmi-value">{bmi.toFixed(2)}</div>

        <h2>{category}</h2>

        <div className="details">
          <p>
            <strong>Height:</strong> {height} cm
          </p>

          <p>
            <strong>Weight:</strong> {weight} kg
          </p>
        </div>

        <Link to="/bmi">
          <button>Calculate Again</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      Name: Vemareddygari Pallavi | Register Number: 212225230293
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
## main.jsx
```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BMI Calculator</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```


## OUTPUT


## RESULT
The BMI Calculator successfully takes user input for height and weight, performs the BMI calculation in real-time using React state and event handling, and displays the BMI value along with the corresponding health category.
