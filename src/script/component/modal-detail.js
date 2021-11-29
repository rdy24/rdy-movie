class ModalDetail extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `<div
                        class="modal fade"
                        id="detailMovie"
                        tabindex="-1"
                        aria-labelledby="detailMovieLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="detailMovieLabel">Modal title</h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body"></div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>`;
	}
}

customElements.define("modal-detail", ModalDetail);
