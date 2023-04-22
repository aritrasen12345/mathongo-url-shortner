<a href="https://documenter.getpostman.com/view/17955962/2s93Y5NeRn">POSTMAN DOCUMENTATION</a>

<a href="http://3.110.45.205/">AWS EC2 Endpoint</a>

<a href="https://github.com/aritrasen12345/mathongo-url-shortner">GitHub Repo</a>

<a href="https://url-shortner-cvj9.onrender.com">Render Deploy Link</a>

```bash
// .env for API

# DEV CRED
DEV_PORT=8000
DEV_DB_NAME=xxxxxxxxx
DEV_DB_URL=xxxxxxxxxxxxxxxxxxxxxxxxxx
DEV_DB_PASSWORD=xxxxx
DEV_JWT_ACTIVATE=xxxxxxxxx
DEV_REDIS_URL=xxxxxxxxxxxxxxxxxxxxxxx

# PROD CRED
PROD_PORT=5000
PROD_DB_NAME=xxxxxxxxx
PROD_DB_URL=xxxxxxxxxxxxxxxxxxxxxxxxxx
PROD_DB_PASSWORD=xxxxx
PROD_JWT_ACTIVATE=xxxxxxxxx
PROD_REDIS_URL=xxxxxxxxxxxxxxxxxxxxxxx

```

## Start Server

```bash
git clone https://github.com/aritrasen12345/mathongo-url-shortner
cd mathongo-url-shortner
npm install
npm start
```

## Test Endpoint

- Test - GET /api/v1/test

## Auth Endpoint

- Login - POST /api/v1/auth/login
- SignUp - POST /api/v1/auth/signup

## URL Endpoint

- Generate ShortUrl - POST /api/v1/url/generate
- Fetch OriginalURL - POST /api/v1/url/fetch

## Dummy User(For Login)

- email: test@test.com
- password: Test@123
