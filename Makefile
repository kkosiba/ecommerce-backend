run:
	docker compose up --detach --build

test:
	docker compose exec backend pytest tests -vv

stop:
	docker compose down

stop-and-clean:
	docker compose down --rmi local --remove-orphans --volumes

rebuild:
	docker-compose up --build --force-recreate

.PHONY: all run test stop clean rebuild
