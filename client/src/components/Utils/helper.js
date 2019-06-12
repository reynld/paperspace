export const formatDaysPassed = (date) => {
    const today = new Date();
    const newDay = new Date(date)
    const days = Math.ceil((today - newDay) / 8.64e7) - 1;

    return days > 0 ? `${days} days ago`: 'today'
}