export interface TimeSlotStatus {
  slot: string;
  status: 'available' | 'busy' | 'highly-busy' | 'not-available';
  bookedCount: number;
}
