import { SignInComponent } from './components/sign-in.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';
import { SignUpComponent } from "./components/sign-up.component";
import { UserComponent } from "./components/user.component";
import { ActiveRoute } from "./core/active.route.service";
import { NewsComponent } from "./components/news.component";
import { AuthGuard } from "./guard/auth.guard";
import { PaymentGuard } from "./guard/payment.guard";
import { PaymentComponent } from "./components/payment.component";
import { NavbarComponent } from "./components/navbar.component";

const activeRoute = new ActiveRoute();
const authGuard = new AuthGuard();
const paymentGuard = new PaymentGuard();

const routes = {
	'/': {
		component: new HomeComponent(),
		guard: [authGuard],
	},
	'/sign-in': {
		component: new SignInComponent()
	},
	'/sign-up': {
		component: new SignUpComponent()
	},
	'/users/:id': {
		component: new UserComponent(),
		guard: [authGuard],
	},
	'/news': {
		component: new NewsComponent(),
		guard: [authGuard],
	},
	'/payments': {
		component: new PaymentComponent(),
		guard: [authGuard, paymentGuard],
	},
	'**': {
		component: new NotFoundComponent()
	}
};

const router = async () => {
	const header = document.querySelector('app-header');
	const container = document.querySelector('app-container');

	const request = activeRoute.parseRequestURL();
	const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');

	const component = routes[url] ? routes[url]['component'] : routes['**']['component'];
	const guards = routes[url] ? routes[url]['guard'] : null;

	if (guards) {
		const guardState = guards.every((item) => item.canActivate());

		if (!guardState) return;
	}

	if (header) {
		const navbarComponent = new NavbarComponent();

		await navbarComponent.beforeRender();
		header.innerHTML = navbarComponent.render();
		navbarComponent.afterRender();
	}

	await component.beforeRender();
	container.innerHTML = component.render();
	component.afterRender();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

window.addEventListener('load', function() {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	let forms = document.getElementsByClassName('needs-validation');
	// Loop over them and prevent submission
	let validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}
			form.classList.add('was-validated');
		}, false);
	});
}, false);