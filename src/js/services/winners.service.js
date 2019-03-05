import { Http } from "../core/http.service";
import { ENV } from "../config/env";

// /api/public/winners?part=1&limit=15

export class WinnersService {
	getWinners(token) {
		const http = new Http();

		return new Promise((resolve, reject) => {
			http.get(`${ ENV.apiUrl }/public/winners`)
				.then((response) => {
					console.log(response);
					resolve(response);
				})
				.catch((err) => reject(err));
		});
	}
}