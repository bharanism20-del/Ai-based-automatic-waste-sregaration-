import { Cat, CategoryInfo } from './types';

export const CATS: CategoryInfo[] = [
  { 
    name: 'Plastic', 
    bin: 'Bin 1', 
    color: '#22d3ee', 
    item: 'Water Bottle', 
    iconName: 'Bottle', 
    description: 'PET / HDPE polymers suitable for mechanical flaking & pelletizing',
    materialCode: 'RIC #1 PET',
    degradeTime: '450 years'
  },
  { 
    name: 'Paper', 
    bin: 'Bin 2', 
    color: '#fbbf24', 
    item: 'Cardboard Box', 
    iconName: 'Box', 
    description: 'Cellulose fiber packaging, non-laminated kraft paper',
    materialCode: 'PAP #20 / #21',
    degradeTime: '2 - 6 weeks'
  },
  { 
    name: 'Metal', 
    bin: 'Bin 3', 
    color: '#94a3b8', 
    item: 'Aluminium Can', 
    iconName: 'Can', 
    description: 'Ferrous and non-ferrous alloys, infinite recycling lifecycle',
    materialCode: 'ALU #41',
    degradeTime: '200 - 500 years'
  },
  { 
    name: 'Glass', 
    bin: 'Bin 4', 
    color: '#34d399', 
    item: 'Glass Jar', 
    iconName: 'Wine', 
    description: 'Silica cullet, optical sorting by flint, amber, and emerald color',
    materialCode: 'GL #70',
    degradeTime: '1+ million years'
  },
  { 
    name: 'Organic', 
    bin: 'Bin 5', 
    color: '#a3e635', 
    item: 'Banana Peel', 
    iconName: 'Apple', 
    description: 'Compostable biomass, food scraps for anaerobic digestion or humus',
    materialCode: 'BIO #90',
    degradeTime: '2 - 4 weeks'
  },
  { 
    name: 'E-Waste', 
    bin: 'Bin 6', 
    color: '#c4b5fd', 
    item: 'Old Charger', 
    iconName: 'Plug', 
    description: 'PCBs, copper windings, semiconductor components needing hazardous handling',
    materialCode: 'WEEE Cat 3/4',
    degradeTime: 'Indefinite'
  },
];

export const ALTERNATIVE_ITEMS: Record<Cat, string[]> = {
  'Plastic': ['Water Bottle', 'Milk Jug (HDPE)', 'Takeout Container (PP)', 'Bubble Wrap', 'Soda Cap'],
  'Paper': ['Cardboard Box', 'Newspaper', 'Office Paper', 'Egg Carton', 'Paper Bag'],
  'Metal': ['Aluminium Can', 'Tin Can', 'Foil Tray', 'Soda Can Tab', 'Steel Lid'],
  'Glass': ['Glass Jar', 'Beverage Bottle', 'Medicine Vial', 'Perfume Bottle', 'Food Container'],
  'Organic': ['Banana Peel', 'Apple Core', 'Coffee Grounds', 'Vegetable Scraps', 'Dry Leaves'],
  'E-Waste': ['Old Charger', 'Broken Earbuds', 'Alkaline Battery', 'RAM Stick', 'USB Flash Drive']
};

export const DIST = [32, 18, 11, 9, 24, 6];
export const TREND = [112, 128, 121, 143, 156, 149, 171];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const BIN_UTIL = [68, 41, 55, 30, 82, 22];

export const PROBLEMS = [
  ['Manual segregation', 'Sorting by hand is slow, repetitive and hard to scale.'],
  ['Mixed waste', 'Contaminated streams lower recycling quality and raise processing cost.'],
  ['Recycling difficulties', 'Facilities struggle to recover material from mixed input.'],
  ['Human safety', 'Workers can be exposed to sharp, toxic or infectious items.'],
  ['No intelligent automation', 'Most systems cannot identify waste in real time.'],
];

export const STAGES = ['Detection', 'AI Classification', 'Decision', 'Mechanical Sorting', 'Correct Bin'];

export const ARCH = [
  ['Camera + Sensors', 'Image and presence data capture via high-framerate optical lens and IR beam break.'],
  ['Computer Vision', 'Pre-processing, noise filtering, HSV thresholding, and object region proposal.'],
  ['DNN Classification', 'Predicts waste category using MobileNetV3 / ResNet convolutional feature extractor.'],
  ['Decision Engine', 'Maps category to target chute bin and calculates actuator delay timing based on conveyor speed.'],
  ['IoT Controller', 'Microcontroller command sent via ESP32 / Arduino PWM and telemetry broadcast.'],
  ['Servo / Motor', 'High-torque MG996R servo diverts the item off belt into designated pneumatic chute.'],
  ['Smart Bins', 'Fill-level sensing via HC-SR04 ultrasonic transducer and load cell strain gauge.'],
  ['Dashboard', 'Monitoring, telemetry analytics, and predictive operational insights.'],
];

export const TECH: [string, string][] = [
  ['DNN', 'Image classification model (MobileNetV3 / Custom CNN)'],
  ['Computer Vision', 'OpenCV frame grab, normalization & ROI crop'],
  ['Generative AI', 'Gemini / LLM audit reports, trend & anomaly analysis'],
  ['IoT Controller', 'ESP32 / Arduino PWM servo control & MQTT telemetry'],
  ['Sensors', 'HC-SR04 ultrasonic, IR beam, load cell, DHT22 moisture'],
  ['Cloud & MQTT', 'Telemetry streaming, historical logging & alerts'],
  ['Frontend Dashboard', 'React, TypeScript, Tailwind CSS, Web Audio'],
];

export const FUTURE = [
  'Edge AI deployment (Jetson Nano / Coral TPU)',
  'Robotic delta-arm sorting with suction gripper',
  'Cloud fleet monitoring & multi-facility sync',
  'Predictive maintenance for conveyor belts & servos',
  'Smart-city integration & municipal waste truck dispatching'
];

export const INSIGHTS: Record<string, string> = {
  'Why did plastic increase today?': 'Plastic rose by roughly 18% versus the previous period, driven by more single-use bottle and e-commerce packaging items detected during the morning conveyor shift.',
  'Weekly summary': 'Organic (24%) and plastic (32%) dominate the waste stream. Average classification confidence stayed consistently above 94.8% across all 980 items processed.',
  'Maintenance advice': 'Servo 2 (Paper chute) has registered the highest cycle count (3,410 actuations). Schedule preventive gear lubrication and torque calibration during the next maintenance window.',
  'Sustainability tip': 'Placing a simple rinse or air-knife station before the optical zone could reduce moisture contamination in the paper stream by an estimated 35%.',
  'How to improve sorting throughput?': 'Increasing conveyor velocity to 0.45 m/s with edge-quantized INT8 inference on an NPU accelerator can double throughput from 40 items/min to 80 items/min without accuracy loss.',
  'Explain the sensor fusion role': 'The camera supplies 2D visual geometry and texture, while the load cell measures gram-level mass and ultrasonic measures volumetric depth, preventing lightweight hollow items from being misclassified.'
};

export const NAV = ['problem', 'classify', 'sorting', 'dashboard', 'genai', 'analytics', 'architecture', 'impact'];
