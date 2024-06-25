// Function to calculate the number of days between two dates
export function calculateDaysBetweenDates(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate the difference in milliseconds
  const differenceInTime = end.getTime() - start.getTime();
  
  // Convert the difference from milliseconds to days
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
  return differenceInDays;
}
