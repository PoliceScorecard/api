**[↤ Developer Overview](../README.md)**

Getting Setup with Docker ( Recommended )
===

Requirements
---

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/) _( this comes pre-installed with latest version of Docker )_


Installing
---

Using Docker is Super Easy once it's installed, you just need to run the following commands to do the initial setup:

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.5.1
docker-compose up --build
```

Relaunch Docker
---

To restart the API in docker, you just need to run:

```bash
docker-compose up
```

Accessing the API via Browser
---

Once the API is up and running you can access a local URL via:

```
http://localhost:5000/v1/token?apikey=YOUR_API_KEY&pretty
```

`YOUR_API_KEY` is whatever you setup in [Downloading API](../docs/downloading-api.md)


Accessing the Docker MySQL Database
---

You can connect to your ySql docker instance using the following config options:

```
HOST: 127.0.0.1
PORT: 8083
USER: docker_api
PASS: d0cK3r^4p1
```
