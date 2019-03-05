import { ActiveRoute } from "../core/active.route.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export class UserComponent {
	constructor() {
		this._activeRoute = new ActiveRoute();
		this._authService = new AuthService();
		this._userService = new UserService();

		this._authUserId = this._authService.userId;
		this._activeUserId = this._activeRoute.parseRequestURL().id;
		this._user;
	}

	async beforeRender() {
		this._user = await this._userService.getUser(this._activeUserId);
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
		`;
	}

	afterRender() {
	}
}