docker/format-check:
	docker run --rm -v $(shell pwd):/app -w /app node:latest npx prettier --check '**/*.js'

docker/format-fix:
	docker run --rm -v $(shell pwd):/app -w /app node:latest npx prettier --write '**/*.js'

docker/build:
	docker build -t hondash-frontend .

docker/run:
	docker stop hondash-frontend || true && docker rm hondash-frontend || true && docker run -d --network=hondash_main_network --name hondash-frontend -p 80:80 hondash-frontend
	echo 'now open http://localhost/'

run_rpi:
	docker stop hondash-frontend || true && docker rm hondash-frontend || true && docker run -d --network=hondash_main_network --name hondash-frontend -p 80:80 hondash-frontend
	chromium-browser --use-gl=egl --noerrdialogs --disable-infobars --disable-session-crashed-bubble --disable-features=TranslateUI --kiosk --check-for-update-interval=604800 --incognito http://hondash.local/ &