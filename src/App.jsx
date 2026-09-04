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