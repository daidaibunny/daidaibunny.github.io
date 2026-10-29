/** Verified personal content, kept separate from page layout and interactions. */
export const profile = {
	name: "Yiwei Li",
	chineseName: "李奕纬",
	email: "yil464@ucsd.edu",
	github: "https://github.com/daidaibunny",
	location: "La Jolla, California",
	role: "Graduate Student",
	field: "Computer Science & Engineering",
	institution: "UC San Diego",
	institutionUrl: "https://ucsd.edu",
	sourceUrl: "https://github.com/daidaibunny/daidaibunny.github.io",
	contactIntroduction: "For research, collaboration, or other questions, please reach me by email.",
	introduction:
		"I am a master's student in Computer Science and Engineering at UC San Diego. I received my B.Sc. (Honours) in Computer Science from the University of Nottingham in 2026.",
	about:
		"My research interests include reasoning and planning with language models, multimodal learning, and embodied artificial intelligence. My work on GP2PL explores how agents can reuse plan libraries across different goal requests.",
	previous:
		"Previously, I worked on multimodal retrieval at SenseTime and language-model agents at JD.com.",
} as const;

export const researchContent = {
	introduction:
		"I am interested in how learning-based systems can reason, plan, and interact with their environments.",
	interests: [
		{
			title: "Reasoning and planning.",
			description:
				"Combining language models with structured reasoning and reusable agent capabilities.",
		},
		{
			title: "Multimodal learning.",
			description: "Learning representations that connect visual information and language.",
		},
		{
			title: "World models and embodied intelligence.",
			description: "Understanding environments and learning how to act in them.",
		},
	],
	cvInterests:
		"Reasoning and planning; intelligent agents; multimodal learning; world models and embodied artificial intelligence.",
	gp2pl: {
		title: "GP2PL: Generalized Planning to Plan Libraries",
		paragraphs: [
			"GP2PL constructs reusable belief–desire–intention agent plan libraries from natural-language goals and planning-domain knowledge. A domain-level library is built once and reused across goal requests.",
			"New goals compose existing capabilities. Temporally extended goals add query-specific coordination over the same library.",
		],
		cvSummary:
			"Constructing reusable agent plan libraries from natural-language goals and planning-domain knowledge, with goal composition and temporal coordination.",
		url: "https://github.com/daidaibunny/gp2pl",
	},
	multimodal: {
		title: "Multimodal jigsaw reconstruction",
		description:
			"Research at the University of Nottingham on combining visual information, text semantics, and language-model reasoning for fragment reconstruction.",
		cvSummary:
			"Combining visual information, text semantics, and language-model reasoning for fragment reconstruction at the University of Nottingham.",
	},
} as const;

export const publicationStatus = {
	announcement: "A paper has been accepted at CSAI and is awaiting online publication.",
	detail: "The full citation and publication link will be added when available.",
} as const;

export interface Education {
	institution: string;
	degree: string;
	dates: string;
	detail: string;
}

export const education: readonly Education[] = [
	{
		institution: "University of California, San Diego",
		degree: "M.S. in Computer Science and Engineering",
		dates: "2026 — 2028 (expected)",
		detail: "Graduate student · La Jolla, California",
	},
	{
		institution: "University of Nottingham",
		degree: "B.Sc. (Honours) in Computer Science",
		dates: "2022 — 2026",
		detail: "First Class Honours · Top 1% · Outstanding Graduate",
	},
];

export const experience = [
	{
		organization: "SenseTime",
		role: "Algorithm Research Intern",
		dates: "Jun — Sep 2026",
		description:
			"Researched adaptive recurrent Transformers for multimodal retrieval and query-dependent inference depth.",
	},
	{
		organization: "JD.com",
		role: "Algorithm Research & Development Intern",
		dates: "May — Aug 2025",
		description:
			"Developed and deployed language-model agents for product workflows, with structured tool use and data validation.",
	},
	{
		organization: "Yisa Technology",
		role: "Research & Development Engineer",
		dates: "May — Sep 2024",
		description: "Worked on computer vision models and quantization for edge deployment.",
	},
	{
		organization: "Windaka Technology",
		role: "Python Engineer",
		dates: "Jul — Sep 2023",
		description: "Built web data collection and traffic-monitoring database workflows.",
	},
] as const;

export const projects = [
	{
		name: "OpenTraFi",
		category: "Open-source software",
		description:
			"A personal portfolio tracker that brings accounts, holdings, liabilities, and performance history into one place.",
		tags: ["Full-stack engineering", "Data visualization"],
		url: "https://github.com/daidaibunny/opentrifi",
	},
	{
		name: "AI-powered digital signage",
		category: "Applied machine learning",
		description:
			"Connecting computer vision, language generation, and a feedback dashboard for personalized digital signage.",
		tags: ["Computer vision", "Language models"],
		url: "https://github.com/daidaibunny/ai-digital-signage",
	},
] as const;

/** Add a paper only after its authorship, publication status, and URL are verified. */
export interface Publication {
	title: string;
	authors: string;
	venue: string;
	year: string;
	url: string;
}

export const publications: readonly Publication[] = [];
