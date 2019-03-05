export class NotFoundComponent {
	async beforeRender() {}

	render() {
		return `
		<div class="error-wrapper d-flex justify-content-center">
			<div class="error-box d-flex flex-column justify-content-center text-center w-100">
				<header class="error-header">
					<a class="logo d-inline-block" href="#/">
						<!--<img class="d-inline-block" src="./images/logo.png" width="152" height="158" alt="logo">-->
					</a>
				</header>
				<div class="image-holder">
					<!--<img class="d-inline-block" src="./images/error-404.png" width="521" height="290" alt="404">-->
				</div>
				<div class="text-box">
					<div class="title-error">404 – The page is not found</div>
					<div class="text-holder">
						<p>The page you are looking for is not found. Try again or return to the home page.</p>
					</div>
					<div class="btn-holder">
						<a href="#/" class="btn btn-primary rounded btn-error">Back to Home Page</a>
					</div>
				</div>
			</div>
		</div>`;
	}

	afterRender() {}
}