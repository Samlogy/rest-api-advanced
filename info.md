## Docker

Docker PROS:

- Reproducible builds
- Faster deployments
- scalability
- isolation
- security
- scalability

docker compose:

- simplifies the processes: start / stop / build services
- define multiple services + configurations

display container stats

```
docker stats container
```

display container details (memory leaks)

```
docker stats inscpect
```

debug container

```
docker logs container
```

debug container in real time

```
docker logs -f container
```

listing all containers

```
docker container ls -a
```

container port

```
docker port container
```

display all processes inside the container

```
docker top container
```

push image into docker

```
docker push image-container
```

pull image from docker

```
docker pull image-container
```

## CI / CD

Continuous Integration (CI) / Continuous Deployment (CD).

It's a software development practice emphasizing frequent code integration and automated deployment to production environments.

pros:

- code consistently tested and validated
- reducing errors / beugs
- increase overall quality

CI/CD pipeline consists of the following steps:

- Code: Checked into the repository
- Build: Build is triggered and deployed in a test environment
- Test: Automated tests are executed
- Deploy: Code is deployed to stage, and production environments.

## Monitoring CI/CD pipeline

it's essential for identifying and resolving issues quickly

-
