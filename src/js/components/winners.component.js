import { WinnersService } from "../services/winners.service";

export class WinnersComponent {
	constructor() {
		this._winnersService = new WinnersService();

		this._winners;
		this._winnersContainer;
	}

	async beforeRender() {
		this._winners = await this._winnersService.getWinners();
	}

	addWinner(winner) {
		const template = this._winnerTemplate(winner);

		this._winnersContainer.insertAdjacentHTML("afterbegin", template);
	}

	render() {
		return `
			 <!-- Component styles -->
			<style>
				${ this.style() }
			</style>
			<!-- Component html -->
			<div class="winners-container container">
				<div class="row">
				</div>
			</div>
		`;
	}

	_winnerTemplate(winner) {
		return `
			<div class="img-item-holder col col-12 col-sm-6 col-lg-4">
				<div class="img-item position-relative text-center overflow-hidden h-100">
					<img class="w-100 h-100" src="${ winner.member_id.images[0].image_basic.url }" alt="image description">
					<div class="img-item-hover position-absolute text-white p-3">
						<span class="mx-1">
							<i class="fas fa-eye"></i>
							${ winner.member_id.images[0].image_basic.views.length }
						</span>
						<span class="mx-1">
							<i class="fas fa-thumbs-up"></i>
							${  winner.member_id.images[0].image_basic.likes.length }
						</span>
					</div>
				</div>
			</div>
		`;
	}

	style() {
		return `
			.img-item-holder {
				margin-bottom: 30px;
			}
			.img-item {
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
		this._winnersContainer = document.querySelector('.winners-container .row');

		this._winners.winners.forEach((winner) => {
			this.addWinner(winner);
		});
	}
}