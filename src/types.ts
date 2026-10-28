export type Cat = 'Plastic' | 'Paper' | 'Metal' | 'Glass' | 'Organic' | 'E-Waste';

export interface CategoryInfo {
  name: Cat;
  bin: string;
  color: string;
  item: string;
  iconName?: string;
  description?: string;
  materialCode?: string;
  degradeTime?: string;
}

export interface SensorTelemetry {
  temp: number;
  dist: number;
  weight: number;
  conveyorSpeed: number; // m/s
  ambientHumidity: number; // %
  irBeamBroken: boolean;
  activeServo: number;
}

export interface ClassificationResult {
  item: string;
  category: Cat;
  confidence: number;
  processingTimeMs: number;
  timestamp: string;
  bin: string;
  color: string;
  degradability: string;
  recyclabilityRate: number;
  contaminantsDetected?: string;
}

export interface BinState {
  name: Cat;
  bin: string;
  color: string;
  capacityPct: number;
  itemCount: number;
}
