import { Http } from "../core/http.service";
import { ENV } from "../config/env";

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