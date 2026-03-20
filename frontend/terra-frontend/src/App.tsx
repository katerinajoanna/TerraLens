/* eslint-disable react-hooks/set-state-in-effect */

// function App() {


//   return (
//     <div className='bg-blue-900 min-h-screen'>
//       <h1 className='text-4xl text-center font-bold text-yellow-600 p-25'>
//         TERRA LENS
//       </h1>
//     </div>
//   )
// }

// export default App;

import { useState, useEffect } from 'react';
import axios from 'axios';

// Definiuje typ danych (TypeScript), żeby wiedzieć, co mamy w środku
interface Location {
  id: number;
  continent: string;
  title: string;
  country: string;
  description: string;
}

function App() {
  // Stan na dane (na początku pusta tablica)
  const [locations, setLocations] = useState<Location[]>([]);
  const API_URL = "http://localhost:5000";

  // Funkcja pobierająca dane (nasz "kurier")
  const getLocations = async () => {
    try {

      const response = await axios.get(`${API_URL}/places`);;
      setLocations(response.data); // Wkładam dane do stanu
      console.log("Dane z serwera:", response.data);
    } catch (error) {
      console.error("Problem z pobieraniem:", error);
    }
  };

  // pobieranie tylko RAZ po załadowaniu strony
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className='bg-blue-900 min-h-screen text-gray-100 p-10'>
      <h1 className='text-4xl text-center font-bold text-yellow-600 mb-10 '>
        TERRA LENS
      </h1>

      {/*  Wyświetlam dane (mapujemy tablicę na elementy HTML) */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {locations.map((loc) => (
          <div key={loc.id} className='border border-y-gray-400 border-x-gray-300 p-4 rounded-lg bg-blue-800 fon'>
            <h2 className='text-2xl font-semibold'>{loc.title}</h2>
            <p className='text-sm italic'>{loc.country} ({loc.continent})</p>
            <p className='mt-2'>{loc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
