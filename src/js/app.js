import { SignInComponent } from './components/sign-in.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';
import { SignUpComponent } from "./components/sign-up.component";
import { UserComponent } from "./components/user.component";
import { ActiveRoute } from "./core/active.route.service";
import { NewsComponent } from "./components/news.component";

const routes = {
	'/': new HomeComponent(),
	'/sign-in': new SignInComponent(),
	'/sign-up': new SignUpComponent(),
	'/users/:id': new UserComponent(),
	'/news': new NewsComponent(),
	'**': new NotFoundComponent()
};

const activeRoute = new ActiveRoute();

const router = async () => {
	const container = document.querySelector('app-container');
	const request = activeRoute.parseRequestURL();
	const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');

	const component = routes[url] || routes['**'];

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