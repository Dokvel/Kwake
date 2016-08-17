export const loadCalendarApi = (callback) => {
  gapi.client.load('calendar', 'v3', callback);
}

export const signOut = (callback) => {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(callback);
}

export const listUpcomingEvents = (callback) => {
  let request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 50,
    'orderBy': 'startTime'
  });
  request.execute(callback);
}
