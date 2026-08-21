# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Copy the project files
COPY pom.xml .
COPY src ./src

# Build the application skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app

# Copy the compiled executable JAR from the builder stage
COPY --from=builder /app/target/spring-server-0.0.1-SNAPSHOT.jar app.jar

# Render assigns a port dynamically via the PORT environment variable.
# Our Spring Boot properties already map server.port=${PORT:8080}.
EXPOSE 8080

# Execute the application
CMD ["java", "-jar", "app.jar"]
