# System Design

name: CI/CD Pipeline
on: [push]
jobs:
ci:
runs-on: ubuntu-latest
steps: - name: Checkout code
uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

      - name: Build & push Docker image
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          tags: your-image-name:latest

cd:
runs-on: ubuntu-latest
needs: build
steps: - name: Checkout code
uses: actions/checkout@v2

      - name: Install SSH client
        run: sudo apt-get install -y openssh-client

      - name: Deploy to production server
        env:
          PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          HOST: ${{ secrets.PRODUCTION_HOST }}
          USER: ${{ secrets.PRODUCTION_USER }}
        run: |
          echo "$PRIVATE_KEY" > private_key.pem
          chmod 600 private_key.pem
          scp -i private_key.pem -r . $USER@$HOST:/app
          ssh -i private_key.pem -t $USER@$HOST "cd /app && docker-compose down && docker-compose pull && docker-compose up -d"
          rm -f private_key.pem
