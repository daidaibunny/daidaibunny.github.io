import "./styles.css";

/** Enhance the native disclosure menus while preserving navigation without JavaScript. */
const initializeNavigation = (): void => {
	const header = document.querySelector<HTMLElement>(".site-header");
	const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
	const navigation = document.querySelector<HTMLElement>("#site-nav");
	if (!header || !toggle || !navigation) return;

	const groups = navigation.querySelectorAll<HTMLDetailsElement>(".nav-group");
	const closeGroups = (except?: HTMLDetailsElement): void => {
		for (const group of groups) {
			if (group !== except) group.open = false;
		}
	};
	const setExpanded = (expanded: boolean): void => {
		toggle.setAttribute("aria-expanded", String(expanded));
		navigation.classList.toggle("is-open", expanded);
		if (!expanded) closeGroups();
	};

	toggle.hidden = false;
	document.documentElement.classList.add("navigation-ready");
	toggle.addEventListener("click", () => {
		setExpanded(toggle.getAttribute("aria-expanded") !== "true");
	});
	for (const group of groups) {
		group.addEventListener("toggle", () => {
			if (group.open) closeGroups(group);
		});
	}
	for (const link of navigation.querySelectorAll("a")) {
		link.addEventListener("click", () => setExpanded(false));
	}
	document.addEventListener("click", (event) => {
		if (event.target instanceof Node && !header.contains(event.target)) {
			setExpanded(false);
		}
	});
	document.addEventListener("keydown", (event) => {
		if (event.key !== "Escape") return;
		const openGroup = [...groups].find((group) => group.open);
		if (openGroup) {
			closeGroups();
			openGroup.querySelector("summary")?.focus();
		} else if (toggle.getAttribute("aria-expanded") === "true") {
			setExpanded(false);
			toggle.focus();
		}
	});
	window.matchMedia("(min-width: 701px)").addEventListener("change", () => setExpanded(false));
};

initializeNavigation();

const printButton = document.querySelector<HTMLButtonElement>("[data-print-cv]");
if (printButton) {
	printButton.hidden = false;
	printButton.addEventListener("click", () => window.print());
}
