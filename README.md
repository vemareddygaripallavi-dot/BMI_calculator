# Ex06 BMI Calculator
## Date: 04-09-2026

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
## app.jsx
```
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  return (
    <div className="page">
      <div className="card">
        <h1>BMI Calculator</h1>

        <p>
          Calculate your Body Mass Index and know your health category.
        </p>

        <Link to="/bmi">
          <button>Start Calculator</button>
        </Link>
      </div>
    </div>
  );
}

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const calculateBMI = (e) => {
    e.preventDefault();

    if (height === "" || weight === "") {
      setError("Please enter both height and weight.");
      return;
    }

    if (Number(height) <= 0 || Number(weight) <= 0) {
      setError("Height and weight must be greater than 0.");
      return;
    }

    setError("");

    navigate(`/result?height=${height}&weight=${weight}`);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>BMI Calculator</h1>

        <form onSubmit={calculateBMI}>
          <label>Height (cm)</label>

          <input
            type="number"
            placeholder="Enter height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <label>Weight (kg)</label>

          <input
            type="number"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Calculate BMI</button>
        </form>

        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

function Result() {
  const params = new URLSearchParams(window.location.search);

  const height = Number(params.get("height"));
  const weight = Number(params.get("weight"));

  const heightInMeters = height / 100;

  const bmi = weight / (heightInMeters * heightInMeters);

  let category;

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

        <div className="bmi-value">
          {bmi.toFixed(2)}
        </div>

        <h2>{category}</h2>

        <p>Height: {height} cm</p>
        <p>Weight: {weight} kg</p>

        <Link to="/bmi">
          <button>Calculate Again</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/result" element={<Result />} />
      </Routes>

      <footer>
        Name: Vemareddygari Pallavi | Register Number: 212225230293
      </footer>
    </BrowserRouter>
  );
}

export default App;
```
## app.css
```
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
}

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.card {
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card h1 {
  color: #333;
  margin-bottom: 15px;
}

.card p {
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
}

form {
  text-align: left;
}

label {
  display: block;
  margin-top: 15px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  width: 100%;
  padding: 14px;
  margin-top: 25px;
  border: none;
  border-radius: 8px;
  background: #667eea;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #5568d8;
}

a {
  display: inline-block;
  margin-top: 20px;
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
}

.error {
  color: red !important;
  margin-top: 15px;
}

.result-card h2 {
  margin: 20px 0;
  color: #667eea;
}

.bmi-value {
  font-size: 55px;
  font-weight: bold;
  color: #764ba2;
  margin: 20px 0;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 14px;
}

@media (max-width: 500px) {
  .card {
    padding: 25px;
  }

  .card h1 {
    font-size: 28px;
  }

  .bmi-value {
    font-size: 45px;
  }

  footer {
    font-size: 12px;
  }
}
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
## index.html
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
<img width="1385" height="855" alt="image" src="https://github.com/user-attachments/assets/31513a96-3ace-4905-9186-50a328b90321" />


<img width="1262" height="849" alt="image" src="https://github.com/user-attachments/assets/c344710b-a10b-44b8-b83e-37a1cfd79cbe" />

<img width="1377" height="853" alt="image" src="https://github.com/user-attachments/assets/ba495747-d984-44b7-8e78-3efc9afc7ddc" />

## RESULT
The BMI Calculator successfully takes user input for height and weight, performs the BMI calculation in real-time using React state and event handling, and displays the BMI value along with the corresponding health category.
