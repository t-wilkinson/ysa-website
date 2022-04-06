function getAttributes(data) {
	return data.data.map(({ attributes }) => ({ ...attributes }));
}

async function fetchAPI(url, request) {
	const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, request);

	const data = await response.json();
	if (data.error) {
		throw new Error(data.error);
	}
	return data;
}

export async function getEvents({ day, month, year }) {
	const date = new Date(year, month, day);
	const nextDate = new Date(year, month, day + 1);
	const data = await fetchAPI(
		`/events?filters[start][$gt]=${date.toJSON()}&filters[start][$lt]=${nextDate.toJSON()}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	return getAttributes(data);
}

export async function getEventDays({ month, year }) {
	const data = await fetchAPI(`/events/days?filters[month]=${month + 1}&filters[year]=${year}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return data;
}
