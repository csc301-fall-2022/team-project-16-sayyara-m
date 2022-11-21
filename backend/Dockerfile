FROM amazoncorretto:17

# Run with ./mvnw
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

#ENV SPRING_PROFILES_ACTIVE prod

RUN ./mvnw dependency:go-offline

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]