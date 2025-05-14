export const getDate = (upcomingEventDate) => {
    const year = upcomingEventDate.substring(0, 4);
    const month = parseInt(upcomingEventDate.substring(4, 6), 10);
    const day = parseInt(upcomingEventDate.substring(6, 8), 10);
    const eventDate = new Date(year, month - 1, day);
    const formatDate = (date) => {
      const options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };
    return formatDate(eventDate);
}

export const getRangeDate = (upcomingEventDate) => {
  const year = upcomingEventDate.substring(0, 4);
  const month = parseInt(upcomingEventDate.substring(4, 6), 10);
  const day = parseInt(upcomingEventDate.substring(6, 8), 10);
  const eventDate = new Date(year, month - 1, day);
  const formatDate = (date, options) => {
    return date.toLocaleDateString("en-US", options);
  };
  return {
      day: formatDate(eventDate, { day: "numeric" }),
      monthYear: formatDate(eventDate, { month: "long", year: "numeric" })
  };
}
