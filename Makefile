docker/format-check:
	docker run --rm -v $(shell pwd):/app -w /app node:latest npx prettier --check '**/*.js'

docker/format-fix:
	docker run --rm -v $(shell pwd):/app -w /app node:latest npx prettier --write '**/*.js'

docker/build:
	docker build -t hondash-frontend .

docker/run:
	docker stop hondash-frontend || true && docker rm hondash-frontend || true && docker run -d --name hondash-frontend -p 8080:80 hondash-frontend
	open http://localhost:8080/