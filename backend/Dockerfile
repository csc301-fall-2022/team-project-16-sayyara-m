FROM maven:3.8.1-openjdk-17-slim AS build
COPY src ./src
COPY pom.xml ./
RUN mvn -f ./pom.xml clean package -DskipTests

FROM openjdk:17-jdk-alpine
VOLUME /tmp
COPY --from=build target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]