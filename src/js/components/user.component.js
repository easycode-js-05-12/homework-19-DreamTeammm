import { ActiveRoute } from "../core/active.route.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export class UserComponent {
	constructor() {
		this._activeRoute = new ActiveRoute();
		this._authService = new AuthService();
		this._userService = new UserService();

		this._activeUserId;
		this._user;
		this._userImages = [];
		this._imagesTemplate;
	}

	async beforeRender() {
		this._activeUserId = this._activeRoute.parseRequestURL().id;

		this._user = await this._userService.getUser(this._activeUserId);
		this._userImages = await this._userService.getUserImages(this._activeUserId);
		this._imagesTemplate = this._userImages.images.map((image) => this._singleImageTemplate(image));
	}

	render() {
		return `
			 <!-- Component styles -->
			<style>
				${ this.style() }
			</style>
			<!-- Component html -->
			<div class="user-cover-container" style="background: url(${ this._user.cover }) no-repeat center / cover;"></div>
			<div class="user-avatar-container d-flex justify-content-center">
				<div class="user-avatar rounded-circle">
					<img class="w-100" src="${ this._user.avatar }" alt="${ this._user.full_name }">
				</div>
			</div>
			<div class="images-container container">
				<div class="row">
					${ this._imagesTemplate.join('') }
				</div>
			</div>
		`;
	}

	_singleImageTemplate(image) {
		return `
			<div class="col col-12 col-md-6 col-lg-4">
				<div class="img-item position-relative text-center overflow-hidden">
					<img class="w-100 h-100" src="${ image.url }" alt="image description">
					<div class="img-item-hover position-absolute text-white">
						<span class="mx-1">
							<i class="fas fa-eye"></i>
							${ image.views.length }
						</span>
						<span class="mx-1">
							<i class="fas fa-thumbs-up"></i>
							${ image.likes.length }
						</span>
					</div>
				</div>
			</div>
		`;
	}

	style() {
		return `
			.user-cover-container {
				width: 100%;
				height: 400px;
			}
			.user-avatar-container {
				transform: translateY(-50%);
			}
			.user-avatar {
				width: 138px;
				height: 138px;
				overflow: hidden;
			}
			.img-item {
				height: 200px;
				margin-bottom: 30px;
				background-color: #000;
			}
			.img-item img {
				object-fit: cover;
			}
			.img-item-hover {
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				opacity: 0;
				background: rgba(0, 0, 0, .5);
				transition: opacity .28s ease-in;
			}
			.img-item:hover .img-item-hover {
				opacity: 1;
			}
		`;
	}

	afterRender() {
	}
}