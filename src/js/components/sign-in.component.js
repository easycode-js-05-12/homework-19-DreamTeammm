import { AuthService } from './../services/auth.service';
import { Routing } from "../core/routing.service";

export class SignInComponent {
	constructor() {
		this._autService = new AuthService();
		this._routing = new Routing();
	}

	async beforeRender() {
		if (this._autService.token) {
			this._routing.navigate(`/user/${ this._autService.userId }`);
		}
	}

	render() {
		return `
			<div class="container">
				<div class="auth-wrap row py-5">
					<div class="auth-form col col-12 col-md-6 mx-auto my-auto">
						<h3>Login to Social.</h3>
						<p class="text-secondary">Enter your e-mail address & password to login to your Social account.</p>
						<form name="loginForm" novalidate>
							<div class="form-group">
								<input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
								<input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
								<div class="d-flex mt-5">
									<button type="submit" class="btn btn-primary btn-sm">Login</button>
								</div>
							</div>
						</form>
					</div>
					<!-- /.auth-form -->
					<div class="auth-bg col col-12 col-md-6"></div>
					<!-- /.auth-bg -->
				</div>
				<!-- /.auth-wrap -->
			</div>
		`;
	}

	afterRender() {
		document.forms['loginForm'].addEventListener('submit', (e) => {
			e.preventDefault();

			const email = e.target.elements['email'].value;
			const password = e.target.elements['password'].value;

			if (!email || !password) return;

			this._autService.login(email, password)
				.then((response) => {
					this._routing.navigate(`/users/${ response.id }`, { myData: 'My data' });
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
}