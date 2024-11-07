import { useState, useEffect, FC, ReactElement } from 'react';
import { PatientData } from "../types/Patient.ts";

interface JsonParserProps {
  jsonString: string;
}

const ID_KEY = 'patientId';

/**
 * Parses a JSON string to extract patient data.
 *
 * @param jsonString - The JSON string to be parsed.
 * @returns {PatientData[] | null} An array of patient objects if valid, otherwise null.
 */
const parseJsonString = (jsonString: string): PatientData[] | null => {
  try {
    const data = JSON.parse(jsonString);

    if (Array.isArray(data)){
      const patients: PatientData[] = data.map((item) => {
        if (item[ID_KEY]) {
          return item as PatientData;
        }
        console.error(`Item does not contain a ${ID_KEY} key.`);
        return null;
      }).filter((patient): patient is PatientData => patient !== null);

      return patients;
    }


    // if (Array.isArray(data)) {
    //   const patients: PatientData[] = data.map((item) => {
    //     if (item[ID_KEY]) {
    //       return item as PatientData;
    //     }
    //     console.error(`Item does not contain a ${ID_KEY} key.`);
    //     return null;
    //   }).filter((patient): patient is PatientData => patient !== null);
    //
    //   return patients;
    // } else {
    //   if (data[ID_KEY]) {
    //     return [data as PatientData];
    //   } else {
    //     console.error(`JSON does not contain a ${ID_KEY} key.`);
    //   }
    // }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

  return null;
};


/**
 * JsonParser component that parses a JSON string and renders a dropdown list of patients.
 *
 * @param {JsonParserProps} props - The properties for the JsonParser component.
 * @param {string} props.jsonString - The JSON string that contains the patient data.
 *
 * @returns {JSX.Element | null} A dropdown list of patients or null if the parsing is unsuccessful.
 */
const JsonParser: FC<JsonParserProps> = ({ jsonString }: JsonParserProps): ReactElement | null => {
  const [patients, setPatients] = useState<PatientData[] | null>(null);

  useEffect(() => {
    const parsedData = parseJsonString(jsonString);
    if (parsedData) {
      setPatients(parsedData);
    }
  }, [jsonString]);

  return patients ? (
    <select>
      {patients.map((patient) => (
        <option key={patient.patientId} value={patient.patientId}>
          {patient.patientId}
        </option>
      ))}
    </select>
  ) : null;
};

export default JsonParser;