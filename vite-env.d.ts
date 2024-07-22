// vite-env.d.ts
interface ImportMetaEnv {
	VITE_MEILISEARCH_API_KEY: string;
	// Add other environment variables here if needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
