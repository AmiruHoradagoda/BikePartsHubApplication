# Step 1: Use an official OpenJDK base image from Docker Hub
FROM openjdk:17-jdk-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy Maven wrapper and project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Step 4: Build the application
RUN ./mvnw clean package -DskipTests

# Step 5: Copy the Spring Boot JAR file to a different location (if needed)
# This step might be redundant since we're building in the container
# COPY target/bikePartsHub-0.0.1-SNAPSHOT.jar /app/bikePartsHub.jar

# Step 6: Expose the port your application runs on
EXPOSE 8080

# Step 7: Define the command to run your Spring Boot application
CMD ["java", "-jar", "target/bikePartsHub-0.0.1-SNAPSHOT.jar"]
