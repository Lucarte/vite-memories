import MeiliSearch from "meilisearch";

const client = new MeiliSearch({
	host: "http://meilisearch:7700",
	apiKey: process.env.REACT_APP_MEILISEARCH_API_KEY,
});
