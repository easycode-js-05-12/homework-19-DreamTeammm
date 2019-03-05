import { Http } from "../core/http.service";
import { ENV } from "../config/env";

export class NewsService {
	getNews(token) {
		const http = new Http();

		return new Promise((resolve, reject) => {
			http.get(`${ ENV.apiUrl }/public/news`, {
				headers: {
					'x-access-token': `${ token }`
				}
			})
				.then((response) => {
					console.log(response);
					resolve(response);
				})
				.catch((err) => reject(err));
		});
	}
}