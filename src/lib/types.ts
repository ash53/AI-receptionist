export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  avatar?: string;
  buttons?: { text: string; link: string }[];
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  roomType: 'single' | 'double' | 'suite';
  status: 'pending' | 'confirmed';
  createdAt: Date;
}

export interface Chat {
  id: string;
  user: {
    id: string;
    name: string;
  };
  messages: Message[];
  startTime: Date;
  endTime: Date;
  summary?: string;
}
