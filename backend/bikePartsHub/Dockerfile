# Stage 1: Build the application
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/bikePartsHub-0.0.1-SNAPSHOT.jar /app/bikePartsHub.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/bikePartsHub.jar"]
