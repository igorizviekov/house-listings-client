export interface BookingIndex {
  [key: string]: BookingIndexYear;
}
export interface BookingIndexYear {
  [key: string]: BookingIndexMonth;
}

export interface BookingIndexMonth {
  [key: string]: boolean;
}
