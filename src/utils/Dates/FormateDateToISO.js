export const FormateDateToIso = (date, time) => {
    // Your local date-time string
    const localDateString = date;
    const timeString = time;

    // Parse the local date-time string
    const localDate = new Date(localDateString);

    // Create a new Date object combining the local date and the time
    if (timeString) {
        const [hours, minutes] = timeString.split(':');
        const period = timeString.split(' ')[1]; // AM or PM

        // Adjust hours based on AM/PM
        let adjustedHours = parseInt(hours, 10);
        if (period === 'PM' && adjustedHours !== 12) {
            adjustedHours += 12;
        } else if (period === 'AM' && adjustedHours === 12) {
            adjustedHours = 0;
        }

        // Set the time on the local date
        localDate.setHours(adjustedHours, parseInt(minutes, 10));
    }

    // Convert the date to ISO 8601 format in UTC
    const isoDateString = localDate.toISOString();

    return isoDateString
}