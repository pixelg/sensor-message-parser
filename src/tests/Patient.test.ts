   // patientTest.test.ts
   import { PatientData } from '../types/Patient';

   const patientTest = (patient: PatientData) => {
     return `Patient Id: ${patient.patientId}`;
   };

   describe('patientTest', () => {
     it('should return the correct patient information', () => {
       const patient: PatientData = { patientId: '12234', sensorMessages: [] };
       const result = patientTest(patient);
       expect(result).toBe('Patient Id: 12234');
     });
   });