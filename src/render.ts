import {
	education,
	experience,
	profile,
	projects,
	publicationStatus,
	publications,
	researchContent,
} from "./content.ts";

export const pageNames = ["home", "research", "publications", "projects", "cv", "contact"] as const;
export type PageName = (typeof pageNames)[number];

/** Escape editable content before inserting it into static HTML. */
const escapeHtml = (value: string): string =>
	value.replace(/[&<>"']/g, (character) => {
		const entities: Record<string, string> = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		};
		return entities[character] ?? character;
	});

const currentPage = (page: PageName, target: PageName): string =>
	page === target ? ' aria-current="page"' : "";

const siteHeader = (page: PageName): string => `
	<a class="skip-link" href="#page-content">Skip to content</a>
	<header class="site-header">
		<div class="container header-inner">
			<a class="site-name" href="/">${escapeHtml(profile.name)}</a>
			<button class="menu-toggle" type="button" aria-expanded="false"
				aria-controls="site-nav" hidden>Menu</button>
			<nav id="site-nav" class="site-nav" aria-label="Main navigation">
				<a href="/"${currentPage(page, "home")}>Home</a>
				<details class="nav-group">
					<summary${page === "research" || page === "publications" ? ' class="current-group"' : ""}>
						Research <span class="nav-chevron" aria-hidden="true">⌄</span>
					</summary>
					<div class="submenu">
						<a href="/research/"${currentPage(page, "research")}>Research interests</a>
						<a href="/research/#gp2pl">GP2PL</a>
						<a href="/publications/"${currentPage(page, "publications")}>Publications</a>
					</div>
				</details>
				<details class="nav-group">
					<summary${page === "projects" ? ' class="current-group"' : ""}>
						Projects <span class="nav-chevron" aria-hidden="true">⌄</span>
					</summary>
					<div class="submenu">
						<a href="/projects/"${currentPage(page, "projects")}>Selected projects</a>
						<a href="/projects/#opentrifi">OpenTraFi</a>
						<a href="/projects/#digital-signage">Digital signage</a>
					</div>
				</details>
				<a href="/cv/"${currentPage(page, "cv")}>CV</a>
				<a href="/contact/"${currentPage(page, "contact")}>Contact</a>
			</nav>
		</div>
	</header>`;

const sidebar = (): string => `
	<aside class="profile-sidebar" aria-label="Profile">
		<p class="profile-name">${escapeHtml(profile.name)} <span lang="zh">${escapeHtml(profile.chineseName)}</span></p>
		<p>${escapeHtml(profile.role)}<br>${escapeHtml(profile.field)}</p>
		<p><a href="${escapeHtml(profile.institutionUrl)}">${escapeHtml(profile.institution)}</a><br>${escapeHtml(profile.location)}</p>
		<ul class="profile-links">
			<li><a href="mailto:${profile.email}">Email</a></li>
			<li><a href="${profile.github}">GitHub</a></li>
			<li><a href="/cv/">Curriculum vitae</a></li>
		</ul>
	</aside>`;

const siteFooter = (): string => `
	<footer class="site-footer container">
		<p>© ${new Date().getUTCFullYear()} ${escapeHtml(profile.name)}</p>
		<a href="${escapeHtml(profile.sourceUrl)}">Source</a>
	</footer>`;

const educationList = (): string =>
	education
		.map(
			(item) => `<div class="education-entry">
				<div><h3>${item.institution}</h3><p>${item.degree}</p>
					<p class="muted">${item.detail}</p></div>
				<p class="entry-date">${item.dates}</p>
			</div>`,
		)
		.join("");

const home = (): string => `
	<h1>About me</h1>
	<p>${escapeHtml(profile.introduction)}</p>
	<p>${escapeHtml(profile.about)}</p>
	<p>${escapeHtml(profile.previous)}</p>
	<section aria-labelledby="education-heading">
		<h2 id="education-heading">Education</h2>
		${educationList()}
	</section>
	<section aria-labelledby="experience-heading">
		<h2 id="experience-heading">Recent experience</h2>
		<ul class="experience-list">
			${experience
				.slice(0, 2)
				.map(
					(item) => `<li><strong>${item.organization}</strong>,
						${item.role}<br><span class="muted">${item.dates}</span></li>`,
				)
				.join("")}
		</ul>
		<p class="small"><a href="/cv/">Full curriculum vitae</a></p>
	</section>`;

const research = (): string => `
	<h1>Research</h1>
	<p>${escapeHtml(researchContent.introduction)}</p>
	<section aria-labelledby="interests-heading">
		<h2 id="interests-heading">Research interests</h2>
		<ul class="research-interests">
			${researchContent.interests
				.map(
					(interest) => `<li><strong>${escapeHtml(interest.title)}</strong>
						${escapeHtml(interest.description)}</li>`,
				)
				.join("")}
		</ul>
	</section>
	<section id="gp2pl" aria-labelledby="gp2pl-heading">
		<h2 id="gp2pl-heading">${escapeHtml(researchContent.gp2pl.title)}</h2>
		${researchContent.gp2pl.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
		<p class="resource-links">
			<a href="${escapeHtml(researchContent.gp2pl.url)}">Code</a>
		</p>
	</section>
	<section aria-labelledby="multimodal-heading">
		<h2 id="multimodal-heading">${escapeHtml(researchContent.multimodal.title)}</h2>
		<p>${escapeHtml(researchContent.multimodal.description)}</p>
	</section>`;

const publicationPage = (): string => `
	<h1>Publications</h1>
	${
		publications.length
			? publications
					.map(
						(paper) => `<article class="publication-entry">
							<h2><a href="${escapeHtml(paper.url)}">${escapeHtml(paper.title)}</a></h2>
							<p>${escapeHtml(paper.authors)}</p>
							<p>${escapeHtml(paper.venue)}, ${escapeHtml(paper.year)}.</p>
						</article>`,
					)
					.join("")
			: `<p>${escapeHtml(publicationStatus.announcement)}</p>
				<p class="muted">${escapeHtml(publicationStatus.detail)}</p>`
	}`;

const projectPage = (): string => `
	<h1>Projects</h1>
	${projects
		.map(
			(project, index) => `<section id="${index === 0 ? "opentrifi" : "digital-signage"}"
				aria-labelledby="project-${index}-heading">
				<h2 id="project-${index}-heading">${project.name}</h2>
				<p>${project.description}</p>
				<p class="small muted">${project.tags.join(" · ")}</p>
				<p class="resource-links"><a href="${project.url}">Code on GitHub</a></p>
			</section>`,
		)
		.join("")}
	<p><a href="${profile.github}">Other projects on GitHub</a></p>`;

const cv = (): string => `
	<div class="page-title-row"><h1>Curriculum vitae</h1>
		<button type="button" class="print-button" data-print-cv hidden>Print / Save PDF</button></div>
	<div class="print-heading"><h2>${escapeHtml(profile.name)}</h2><p>${profile.email} · ${profile.github}</p></div>
	<section class="cv-section"><h2>Education</h2>${educationList()}</section>
	<section class="cv-section"><h2>Research interests</h2>
		<p>${escapeHtml(researchContent.cvInterests)}</p></section>
	<section class="cv-section"><h2>Research & selected projects</h2>
		<article class="cv-entry"><h3>${escapeHtml(researchContent.gp2pl.title)}</h3>
			<p>${escapeHtml(researchContent.gp2pl.cvSummary)}</p>
			<a href="${escapeHtml(researchContent.gp2pl.url)}">${escapeHtml(researchContent.gp2pl.url.replace("https://", ""))}</a>
		</article>
		<article class="cv-entry"><h3>${escapeHtml(researchContent.multimodal.title)}</h3>
			<p>${escapeHtml(researchContent.multimodal.cvSummary)}</p></article>
		${projects
			.map(
				(project) => `<article class="cv-entry"><h3>${project.name}</h3>
					<p>${project.description}</p>
					<a href="${project.url}">${project.url.replace("https://", "")}</a></article>`,
			)
			.join("")}
	</section>
	<section class="cv-section"><h2>Professional experience</h2>
		${experience
			.map(
				(item) => `<article class="cv-entry">
					<div class="entry-heading"><h3>${item.organization}</h3>
						<p class="entry-date">${item.dates}</p></div>
					<p>${item.role}</p><p>${item.description}</p></article>`,
			)
			.join("")}
	</section>`;

const contact = (): string => `
	<h1>Contact</h1>
	<p>${escapeHtml(profile.contactIntroduction)}</p>
	<dl class="contact-list">
		<dt>Email</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd>
		<dt>GitHub</dt><dd><a href="${profile.github}">${escapeHtml(profile.github.replace("https://", ""))}</a></dd>
		<dt>Location</dt><dd>${escapeHtml(profile.location)}</dd>
	</dl>`;

const pageContent: Record<PageName, () => string> = {
	home,
	research,
	publications: publicationPage,
	projects: projectPage,
	cv,
	contact,
};

/** Render a complete page at build time so content works without client-side JavaScript. */
export const renderPage = (page: PageName): string => `
	${siteHeader(page)}
	<main id="main" class="container page-layout${page === "cv" ? " cv-layout" : ""}">
		${sidebar()}
		<div id="page-content" class="page-content" tabindex="-1">${pageContent[page]()}</div>
	</main>
	${siteFooter()}`;
