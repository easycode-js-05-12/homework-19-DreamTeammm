export class Http {
	/**
	 * @description The function sends data to the server
	 * @param url - uniform resource locator
	 * @param data - data
	 * @param options - handler
	 * @return {Promise<any>}
	 */
	post(url, data, options) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	/**
	 * @description The function sends data to the server
	 * @param url - uniform resource locator
	 * @param options - handler
	 * @return {Promise<any>}
	 */
	get(url, options) {
		return new Promise((resolve, reject) => {
			fetch(url, options)
				.then((response) => response.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}
}