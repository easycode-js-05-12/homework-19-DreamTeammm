import { NewsService } from "../services/news.service";
import { AuthService } from "../services/auth.service";

export class NewsComponent {
	constructor() {
		this._authService = new AuthService();
		this._newsService = new NewsService();

		this._authUserToken = this._authService.token;
		this._news;
		this._newsContainer;
	}

	async beforeRender() {
		this._news = await this._newsService.getNews(this._authUserToken);
	}

	/**
	 * @description Feature adds news to markup
	 * @param {object} news - object with full information about the news
	 */
	addNews(news) {
		const template = this.newsTemplate(news);

		this._newsContainer.insertAdjacentHTML("afterbegin", template);
	}

	render() {
		return `
			 <!-- Component styles -->
			<style>
				${ this.style() }
			</style>
			<!-- Component html -->
			<div class="news-wrap container">
				<div class="row"></div>
			</div>
		`;
	}

	newsTemplate(news) {
		return `
			<div class="col col-12 mb-3 mb-md-5">
				<div class="card d-flex flex-md-row">
					<div class="user-info d-flex flex-column align-items-center justify-content-center flex-shrink-0 p-2 p-md-4">
						<div class="user-avatar rounded-circle">
							<img class="w-100" src="${ news.owner.avatar }" alt="${ news.owner.full_name }">
						</div>
						<div class="text-center">
							<h2 class="h3">${ news.owner.full_name }</h2>
							<h3 class="h5">${ news.owner.country }</h3>
						</div>
					</div>
					<div class="previews-box p-2 p-md-4 overflow-hidden">
						<img class="w-100 h-100" src="${ news.pictures[0].url }" alt="image description">
					</div>
				</div>
			</div>
		`;
	}

	style() {
		return `
			.card {
				height: 400px;
			}
			.user-avatar {
				width: 75px;
				height: 75px;
				overflow: hidden;
			}
			.previews-box img {
				object-fit: cover;
			}
			@media (min-width: 768px) {
				.user-info {
					width: 200px;
				}
				.user-avatar {
					width: 138px;
					height: 138px;
				}
			}
		`;
	}

	afterRender() {
		this._newsContainer = document.querySelector('.news-wrap .row');

		this._news.news.forEach((news) => {
			this.addNews(news);
		});
	}
}