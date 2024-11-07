import { useState, ChangeEvent } from 'react';
import './App.css'
import JsonParser from "./components/JsonParser.tsx";
import './types/Patient.ts'

function App() {
  const [jsonString, setJsonString] = useState<string | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setJsonString(result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <h1>Extract KokoNi Patient</h1>
      <div className="card">
        <input
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
        />

        {jsonString && <JsonParser jsonString={jsonString} />}
      </div>
    </>
  );
}

export default App;