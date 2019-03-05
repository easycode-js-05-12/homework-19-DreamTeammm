import { HomeService } from "../services/home.service";

export class HomeComponent {
	constructor() {
		this._homeService = new HomeService();

		this._homeData;
	}

	async beforeRender() {
		this._homeData = await this._homeService.getHomeData();
	}

	render() {
		return `
			 <!-- Component styles -->
			<style>
				${ this.style() }
			</style>
			<!-- Component html -->
			<section class="inner d-flex flex-column" style="background-image: url('${ this._homeData.homeBackground }')">
				<div class="container flex-grow-1 d-flex flex-column px-0">
					<div class="row flex-grow-1">
						<div class="col col-12 col-md-6 col-xs-4">
							<div class="text-box d-flex flex-column justify-content-center p-2 p-md-5 h-100 text-white">
								<div class="logo-holder mb-2 mb-md-4">
									<a class="logo d-inline-block" href="#/"></a>
								</div>
								<div class="text-holder">
									<p>${ this._homeData.innerText }</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-dark text-white py-1">
					<div class="container">
						<div class="row">
							<div class="col">
								<ul class="d-flex flex-column flex-md-row justify-content-center align-items-center list-unstyled mb-0">
									<li class="m-3">
										<dl class="d-inline-flex mb-0">
											<dt class="mr-1">Cities:</dt>
											<dd>${ this._homeData.cities }</dd>
										</dl>
									</li>
									<li class="m-3">
										<dl class="d-inline-flex mb-0">
											<dt class="mr-1">Cities:</dt>
											<dd>${ this._homeData.countries }</dd>
										</dl>
									</li>
									<li class="m-3">
										<dl class="d-inline-flex mb-0">
											<dt class="mr-1">Regions In The World:</dt>
											<dd>${ this._homeData.regions }</dd>
										</dl>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
	}

	style() {
		return `
			.inner {
			    min-height: 100vh;
				background-size: cover;
			    background-position: center;
			}
			.text-box {
			    background-color: rgba(0,0,0,.65);
			}
			.logo {
				height: 158px;
				display: block !important;
				background: url("./images/logo.png") center no-repeat;
			}
		`;
	}

	afterRender() {}
}