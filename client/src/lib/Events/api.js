const API_URL = 'http://localhost:1337/api'

export async function getEvents({day, month, year}) {
	const date = new Date(year, month, day)
	const nextDate = new Date(year, month, day + 1)
	const response = await fetch(`${API_URL}/events?filters[start][$gt]=${date.toJSON()}&filters[start][$lt]=${nextDate.toJSON()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const data = await response.json();
	if (data.error) {
		throw new Error(data.error);
	}
	return data.data.map(({attributes}) => ({...attributes}));
}
