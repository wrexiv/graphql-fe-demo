include .env

SCHEMA_FILE=./backend/schema.graphql
SCHEMA_TARGET_URL=https://api.github.com/repos/wrexiv/mitla-be-demo/contents/src/graphql/schema.graphql

fetch-schema:
	curl -H "Authorization: Bearer $(GITHUB_PERSONAL_TOKEN)" $(SCHEMA_TARGET_URL) | jq -r ".content" | base64 -d > $(SCHEMA_FILE)
	cd frontend && yarn generate
