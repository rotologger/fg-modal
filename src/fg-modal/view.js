class FGModal {
	constructor() {
		this.modals = document.querySelectorAll(".wp-block-create-block-fg-modal");

		this.events();
	}

	events() {
		this.modals?.forEach((modal, index) => {
			const showOnPageLoad = modal.dataset.showonpageload == 1 ? true : false;
			const delay = modal.dataset.delay;
			const selector = modal.dataset.selector;
			const closeBtn = modal.querySelector(".close-btn");

			if (showOnPageLoad) {
				setTimeout(() => this.show(modal, index), delay);
			}

			if (selector) {
				document
					.querySelectorAll(selector)
					?.forEach((el) =>
						el.addEventListener("click", () => this.show(modal)),
					);
			}

			modal.addEventListener("click", (e) => {
				if (e.target.classList.contains("wp-block-create-block-fg-modal")) {
					this.hide(modal, index);
				}
			});

			closeBtn.addEventListener("click", () => {
				this.hide(modal, index);
			});

			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape" && !modal.classList.contains("hidden"))
					this.hide(modal, index);
			});
		});
	}

	show(modal, index = "") {
		if (!this.getCookie(`seenModal-${index}`)) {
			this.restoreYoutubeVideo(modal);

			modal.classList.remove("hidden");
			document.body.style.overflowY = "hidden";
		}
	}

	hide(modal, index) {
		const setCookie = modal.dataset.setcookie === "1" ? true : false;
		const expiresAfter = modal.dataset.expiresafter * 1;

		this.stopYoutubeVideo(modal);

		modal.classList.add("hidden");
		document.body.style.overflowY = "scroll";

		if (setCookie)
			this.createCookie(`seenModal-${index}`, "true", expiresAfter);
	}

	createCookie = (name, value, minutes) => {
		let expires = "";
		if (minutes) {
			let date = new Date();
			date.setTime(date.getTime() + minutes * 60 * 1000);
			expires = "; expires=" + date.toGMTString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	};

	getCookie = (name) => {
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		} else {
			begin += 2;
			var end = document.cookie.indexOf(";", begin);
			if (end == -1) {
				end = dc.length;
			}
		}

		return decodeURI(dc.substring(begin + prefix.length, end));
	};

	stopYoutubeVideo(modal) {
		const iframe = modal.querySelector("iframe");
		if (
			iframe &&
			(iframe.src.includes("youtube.com") || iframe.src.includes("youtu.be"))
		) {
			if (!iframe.dataset.originalsrc) {
				iframe.dataset.originalsrc = iframe.src;
			}
			iframe.src = "";
		}
	}

	restoreYoutubeVideo(modal) {
		const iframe = modal.querySelector("iframe");
		if (iframe && iframe.dataset.originalsrc) {
			iframe.src = iframe.dataset.originalsrc;
		}
	}
}

const fgModal = new FGModal();
