import React from "react";
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
        Name: Vemareddygari Pallavi| Register Number: 212225230293
      </footer>
    </BrowserRouter>
  );
}

export default App;