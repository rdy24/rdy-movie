class AppBar extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `<nav class="navbar navbar-light">
												<div class="container">
													<span class="navbar-brand h1 mb-0 fs-1 ms-auto me-auto">RDYMOVIE</span>
												</div>
											</nav> `;
	}
}

customElements.define("app-bar", AppBar);
