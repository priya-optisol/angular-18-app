export interface Hair {
  color: string;
  type: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address; // Reuses the main Address interface structure
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

// Optimization: Use a String Literal Union Type for predictable roles
export type UserRole = 'admin' | 'moderator' | 'user';

// 2. The Core User Interface
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'female' | 'male' | 'other'; // String literal union type for strict validation
  email: string;
  phone: string;
  username: string;
  password?: string; // Optional: If you don't always request/expose secrets in the UI
  birthDate: string; // Keep as string; handle Date transformations in UI pipes if needed
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: UserRole;
}

// 3. The API Response wrapper interface
export interface UserResponse {
  users: User[];
  total?: number; // Optional metadata standard on dummyjson-like APIs
  skip?: number;
  limit?: number;
}