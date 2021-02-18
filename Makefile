build:
	docker-compose up --build -d

install:
	cp .env.default .env
	cd ./app && yarn install &&  cp .env.default .env 
	cd ./client && yarn install &&  cp .env.default .env

