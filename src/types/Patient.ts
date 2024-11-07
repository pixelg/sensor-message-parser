// types.ts or in an existing file
export interface SensorMessageData {
  type: string;
  sensorExternalId: string;
  timestamp: number;
  canPrevent: boolean;
  presence: boolean;
  secondPresence: boolean;
  sleepState: number;
  averageRespiration: number;
  smoothedRespiration: number;
  standardDeviationRespiration: number;
}

export interface SensorMessage {
  id: string;
  sensorId: string;
  medicalProfileId: string;
  data: SensorMessageData;
  measuredAt: string;
  createdAt: string;
}

export interface PatientData {
  patientId: string;
  sensorMessages: SensorMessage[];
}