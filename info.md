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
pipeline's performence while monitoring:

- Logging: Collect and analyze logs from your pipeline stages and application services to identify issues and track performance metrics.
- Monitoring tools: Implement tools like Prometheus, Grafana, and ELK Stack to collect, visualize, and analyze metrics from your Docker containers and CI/CD pipeline.
- Alerting: Set up alerting mechanisms to notify your team when specific issues or performance thresholds are triggered. Tools like PagerDuty, - Opsgenie, and Slack can help with this.
- Health checks: Configure health checks for your application services to ensure they are running as expected and to detect any issues early.
- Performance analysis: Regularly review performance metrics and logs to identify bottlenecks or areas for improvement in your CI/CD pipeline.
