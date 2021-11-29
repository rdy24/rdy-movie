class SearchBar extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `<div class="row justify-content-center">
				<div class="col-md-8">
					<div class="input-group mt-5 mb-3">
						<input
							type="text"
							class="form-control input-keyword"
							placeholder="Search Movie"
						/>
						<button
							class="btn btn-search"
							type="button"
							id="button-addon2"
						>
							Search
						</button>
					</div>
				</div>
			</div> `;
	}
}

customElements.define("search-bar", SearchBar);
