docker/build:
	docker build -t hondash-frontend .

docker/run:
	docker stop hondash-frontend || true && docker rm hondash-frontend || true && docker run -d --name hondash-frontend -p 8080:80 hondash-frontend
	open http://localhost:8080/