# BikePartsHub

BikePartsHub is a full-stack motorcycle parts storefront and service-center management application. Customers can browse parts, place orders, and book service appointments, while administrators manage products, customers, orders, and service schedules.

The repository contains an Angular frontend and a Spring Boot REST API backed by MySQL, with PayPal payments and Amazon S3 image storage.

## Features

### Customer experience

- Product browsing, search, filtering, and product details.
- Shopping cart, checkout, and order confirmation.
- Account registration, login, and profile management.
- Service selection and appointment booking with time slots.
- Customer dashboard for orders and appointments.

### Administration

- Dashboard with order reporting.
- Product creation, editing, deletion, and image uploads.
- Customer profiles and user role management.
- Order and appointment status management.
- Service catalog and schedule management.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | Angular 17.3, TypeScript 5.4, RxJS |
| UI | Tailwind CSS 3.4, PrimeNG 17, Font Awesome, ngx-toastr |
| Reports | Chart.js, jsPDF, jsPDF AutoTable |
| Backend | Java 17, Spring Boot 3.3.2, Maven Wrapper |
| Persistence | Spring Data JPA, Hibernate, MySQL |
| Authentication | Spring Security, JWT access and refresh tokens |
| Integrations | PayPal REST SDK, AWS SDK for S3 |
| API documentation | Springdoc OpenAPI / Swagger UI |
| Tests | JUnit / Spring Boot Test, Jasmine / Karma |

## Repository structure

```text
BikePartsHubApplication/
├── bikePartsHub_frontend/
│   ├── src/app/admin/          # Admin pages, authentication, and components
│   ├── src/app/user/           # Storefront, customer pages, and authentication
│   ├── src/environments/      # Development and production API URLs
│   ├── src/assets/            # Static assets
│   ├── angular.json           # Angular build and serve configuration
│   └── package.json
├── bikePartsHub_backend/
│   ├── src/main/java/com/bphTeam/bikePartsHub/
│   │   ├── config/            # Security, CORS, PayPal, and S3 configuration
│   │   ├── controller/        # REST endpoints
│   │   ├── dto/               # Request and response models
│   │   ├── entity/            # JPA entities
│   │   ├── mapper/            # Entity / DTO mapping
│   │   ├── repository/        # Database access
│   │   └── service/           # Business logic and integrations
│   ├── src/main/resources/    # Configuration templates and seed SQL
│   ├── src/test/              # Backend tests
│   └── pom.xml
└── README.md
```

## Prerequisites

- JDK 17, with `JAVA_HOME` configured.
- Node.js and npm compatible with Angular 17.3. Check the installed Angular packages' engine requirements when choosing a Node.js version.
- A running MySQL server and a database user with schema creation permissions for the development database.
- PayPal sandbox application credentials for payment testing.
- AWS credentials and an S3 bucket for image uploads.

The backend includes a Maven Wrapper, so a separate Maven installation is not required. The commands below use PowerShell and assume you start from the repository root. On macOS/Linux, use `./mvnw` instead of `.\mvnw.cmd` and set environment variables with your shell's `export` syntax.

## Local setup

### 1. Configure the backend

```powershell
cd bikePartsHub_backend
if (-not (Test-Path src/main/resources/application.yml)) {
    Copy-Item src/main/resources/application-example.yml src/main/resources/application.yml
}
```

The [configuration template](bikePartsHub_backend/src/main/resources/application-example.yml) uses environment variables for credentials. If `application.yml` already exists, review it against this template. Keep real credentials out of version control; `application.yml` is not currently excluded by the backend `.gitignore`.

Set these variables in the terminal that will run the backend, replacing the placeholder values:

```powershell
$env:SPRING_PROFILES_ACTIVE = 'dev'
$env:DB_URL = 'jdbc:mysql://localhost:3306/bikepartshub_db?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC'
$env:DB_USERNAME = 'your-mysql-username'
$env:DB_PASSWORD = 'your-mysql-password'
$env:PAYPAL_CLIENT_ID = 'your-paypal-sandbox-client-id'
$env:PAYPAL_CLIENT_SECRET = 'your-paypal-sandbox-client-secret'
$env:AWS_ACCESS_KEY_ID = 'your-aws-access-key-id'
$env:AWS_SECRET_ACCESS_KEY = 'your-aws-secret-access-key'
$env:AWS_S3_BUCKET_NAME = 'your-bucket-name'
$env:AWS_REGION = 'us-east-1'

# Generate a Base64-encoded, 256-bit key for JWT signing.
$jwtBytes = New-Object byte[] 32
$jwtRng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$jwtRng.GetBytes($jwtBytes)
$env:JWT_SECRET_KEY = [Convert]::ToBase64String($jwtBytes)
$jwtRng.Dispose()
```

Keep the JWT key stable between runs if existing tokens should remain valid. The integration properties must be supplied because the backend creates PayPal and S3 configuration beans at startup; working credentials are needed to exercise their corresponding features. A `.env` file is not automatically loaded by the checked-in setup.

### 2. Start the backend

> **Development database behavior:** The `dev` profile uses `ddl-auto: create-drop`. Hibernate recreates the schema on startup and drops it on normal shutdown. Use a disposable database. The profile also loads sample bikes, products, and services from `data.sql`.

From `bikePartsHub_backend`, in the same terminal:

```powershell
.\mvnw.cmd spring-boot:run
```

The API listens at `http://localhost:8080`. Open [Swagger UI](http://localhost:8080/swagger-ui/index.html) to inspect and try the endpoints.

### 3. Start the frontend

Open a second terminal from the repository root:

```powershell
cd bikePartsHub_frontend
npm install
npm start
```

Open [BikePartsHub](http://localhost:4200). The root route redirects to `/user/home`.

Development requests use `http://localhost:8080`, configured in [environment.development.ts](bikePartsHub_frontend/src/environments/environment.development.ts). The backend development CORS configuration allows `http://localhost:4200` and `http://127.0.0.1:4200`.

### 4. Sign in with a development account

At startup, `AuthenticationServiceImpl.initializeUser()` creates these accounts if their email addresses do not already exist:

| Role | Email | Password | Login page |
| --- | --- | --- | --- |
| Admin | `admin@example.com` | `admin@123` | `/admin/login-admin` |
| Customer | `customer@example.com` | `customer@123` | `/user/login` |

This initializer currently runs in every profile. Remove or restrict the demo-account initializer and replace demo credentials before exposing an installation publicly.

## Configuration reference

| Variable | Purpose / default |
| --- | --- |
| `SPRING_PROFILES_ACTIVE` | Active profile; template defaults to `dev` |
| `DB_URL` | MySQL JDBC URL; development defaults to local `bikepartshub_db` |
| `DB_USERNAME`, `DB_PASSWORD` | Database credentials; explicitly set for your environment |
| `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` | PayPal application credentials |
| `PAYPAL_MODE` | Overrides `paypal.mode`; template uses `sandbox` |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Credentials used by the S3 client |
| `AWS_S3_BUCKET_NAME` | Image storage bucket |
| `AWS_REGION` | Bucket region; template defaults to `us-east-1` |
| `JWT_SECRET_KEY` | Base64-encoded signing key containing at least 32 random bytes |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins in the `prod` profile; comma-separated |
| `SERVER_PORT` | Overrides the backend port, default `8080` |

Profile settings are in [application-dev.yml](bikePartsHub_backend/src/main/resources/application-dev.yml) and [application-prod.yml](bikePartsHub_backend/src/main/resources/application-prod.yml). Production requires database environment variables, uses `ddl-auto: update`, and disables SQL seed initialization.

## API overview

| Base path | Responsibility |
| --- | --- |
| `/api/v1/auth` | Registration, authentication, token refresh, logout |
| `/api/v1/product` | Product queries and management |
| `/api/v1/bikes` | Bike catalog and compatibility-related queries |
| `/api/v1/services` | Service catalog management |
| `/api/v1/appointment` | Services, available time slots, and appointments |
| `/api/v1/order` | Order placement |
| `/api/v1/user` | User details and profile updates |
| `/api/v1/admin` | Customer data, orders, appointments, reports, and roles |
| `/api/v1/paypal` | Payment creation and execution |
| `/api/v1/files` | Product image uploads |

Use [Swagger UI](http://localhost:8080/swagger-ui/index.html) or the [OpenAPI JSON](http://localhost:8080/v3/api-docs) for request schemas and exact methods. Where an endpoint requires authentication, send `Authorization: Bearer <access-token>`.

JWT filtering and method-level authorization are implemented. The current HTTP security configuration permits requests by default, so endpoint restrictions depend on method annotations; review these before a public deployment.

## Build and test

### Frontend

Run from `bikePartsHub_frontend`:

```powershell
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

The build defaults to production and writes to `dist/bike-parts-hub-app/`, with browser assets under `browser/`. Tests use Jasmine and Karma and require Chrome/Chromium. For a development build, use `npm run build -- --configuration development`.

Both development and production configurations currently disable SSR and prerendering. The `serve:ssr:BikePartsHubApp` script is intended for a server build and is not the serving command for the current default production output.

### Backend

Run from `bikePartsHub_backend`, with the backend environment configured:

```powershell
.\mvnw.cmd test
.\mvnw.cmd package
```

The test suite includes a Spring application-context test that requires the configured database and startup properties. Use a disposable test database because the active development profile recreates its schema. Packaging also runs tests and produces `target/bikePartsHub_backend-0.0.1-SNAPSHOT.jar`.

## Deployment configuration

1. Set the frontend API URL in [environment.ts](bikePartsHub_frontend/src/environments/environment.ts) before building. Its checked-in value is `https://bikepartshub.altero.dev`.
2. Build the frontend and serve the generated browser assets with a web server configured to fall back to `index.html` for Angular routes.
3. Set `SPRING_PROFILES_ACTIVE=prod`, database and integration credentials, the JWT key, and `CORS_ALLOWED_ORIGINS` for the deployed frontend.
4. Run the packaged backend with `java -jar target/bikePartsHub_backend-0.0.1-SNAPSHOT.jar`.

The production profile uses Hibernate schema updates; the repository does not provide a versioned database migration workflow.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Backend cannot connect to MySQL | MySQL is running, JDBC URL and credentials are correct, and the user can create/access the development database. |
| Startup reports an unresolved placeholder | All required variables are set in the backend process environment and the base configuration matches the template. |
| Data disappears after restarting | The `dev` profile uses `create-drop`; it is intended for disposable data. |
| Frontend requests fail or hit the wrong server | Check the active Angular environment file, backend port, and allowed CORS origin. |
| Payments or uploads fail | Check PayPal sandbox credentials or S3 credentials, bucket region, and upload permissions. |
| JWT signing fails | Use a valid Base64-encoded secret with at least 32 decoded bytes. |
| Frontend tests cannot launch a browser | Install Chrome/Chromium or configure Karma's browser executable through `CHROME_BIN`. |

## License

No license file is currently included in this repository. Add a license to define the terms for reuse and distribution.
