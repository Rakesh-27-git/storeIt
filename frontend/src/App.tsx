import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setData(JSON.stringify(res.data, null, 2));
      })
      .catch((err) => {
        setData("Error fetching data");
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h1 className=" text-white text-2xl font-bold mb-4">API Response</h1>
      <pre className=" text-white p-4 rounded shadow-md">{data}</pre>
    </div>
  );
}

export default App;
