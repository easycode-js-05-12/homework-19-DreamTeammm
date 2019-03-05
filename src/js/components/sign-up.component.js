import { AuthService } from './../services/auth.service';

export class SignUpComponent {
	constructor() {
		this._autService = new AuthService();
	}

	async beforeRender() {}

	render() {
		return `
			<div class="container">
				<div class="auth-wrap row py-5">
					<div class="auth-form col col-12 col-md-6 mx-auto my-auto">
						<h3>Sign Up to Social.</h3>
						<p class="text-secondary">It\`s awesome here... Enter.</p>
						<form name="signUpForm" class="needs-validation" novalidate>
							<div class="form-group">
								<div class="row">
									<div class="col col-6">
										<input type="text" class="form-control form-control-sm" id="first_name" placeholder="First Name" required>
										<div class="invalid-feedback">Please enter your name.</div>
									</div>
									<div class="col col-6">
										<input type="text" class="form-control form-control-sm" id="last_name" placeholder="Last Name" required>
										<div class="invalid-feedback">Please enter your last name.</div>
									</div>
								</div>

								<div>
									<input type="text" class="form-control form-control-sm mt-3" id="nick_name" placeholder="Nick Name" required>
									<div class="invalid-feedback">Please choose a Nickname</div>
								</div>

								<div class="row mt-3">
									<div class="col col-4">
										<input type="text" class="form-control form-control-sm" id="day_of_birth" min="1" max="31" placeholder="Day" required>
										<div class="invalid-feedback">Please enter your day of birthday</div>
									</div>
									<div class="col col-4">
										<input type="text" class="form-control form-control-sm" id="month_of_birth" min="1" max="12" placeholder="Month" required>
										<div class="invalid-feedback">Please enter your moth of birthday</div>
									</div>
									<div class="col col-4">
										<input type="text" class="form-control form-control-sm" id="year_of_birth" min="0" max="99999999" placeholder="Year" required>
										<div class="invalid-feedback">Please enter your year of birthdayr</div>
									</div>
								</div>

								<div class="row mt-3">
									<div class="col col-6">
										<input type="text" class="form-control form-control-sm" id="country" placeholder="Country" required>
										<div class="invalid-feedback">Please enter your country</div>
									</div>
									<div class="col col-6">
										<input type="text" class="form-control form-control-sm" id="city" placeholder="City" required>
										<div class="invalid-feedback">Please enter your city</div>
									</div>
								</div>

								<select name="gender" id="gender" class="form-control form-control-sm mt-3" required>
									<option value="">Select gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>

								<div>
									<input type="email" class="form-control form-control-sm mt-3" id="email" placeholder="name@example.com" data-pattern="^\\S+@[a-z]+\\.[a-z]+$" required>
									<div class="invalid-feedback">Please enter a right email</div>
								</div>
								<div>
									<input type="tel" class="form-control form-control-sm mt-3" id="phone" placeholder="Phone number" required>
									<div class="invalid-feedback">Please enter yor phone number</div>
								</div>
								<div>
									<input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password"  data-pattern="\\S+" required>
									<div class="invalid-feedback">Please enter password</div>
								</div>
								<div class="d-flex mt-5">
									<button type="submit" class="btn btn-primary btn-sm">Sign Up</button>
									<a href="${ '#/sign-in' }" class="btn btn-link btn-sm ml-auto">Already have an account? Sign in</a>
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
		document.forms['signUpForm'].addEventListener('submit', (e) => {
			e.preventDefault();

			const userData = {
				email: e.target.elements['email'].value,
				password: e.target.elements['password'].value,
				nickname: e.target.elements['nick_name'].value,
				first_name: e.target.elements['first_name'].value,
				last_name: e.target.elements['last_name'].value,
				phone: this._phone(e.target.elements['phone'].value),
				gender_orientation: e.target.elements['gender'].value,
				city: e.target.elements['city'].value,
				country: e.target.elements['country'].value,
				date_of_birth_day: this._date(e.target.elements['day_of_birth'].value),
				date_of_birth_month: this._date(e.target.elements['month_of_birth'].value),
				date_of_birth_year: this._date(e.target.elements['year_of_birth'].value)
			}

			this._autService.registration(userData)
				.then((response) => {
					console.log(response);
					e.target.reset();
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}

	_phone(value) {
		return value.slice(0, value.search(/[a-z]/i)).replace(/\D/g, '');
	}

	_date(value) {
		return value.length > 1 ? value : `0${ value }`;
	}
}