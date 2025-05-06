FROM eclipse-temurin:11-jdk AS build
WORKDIR /app

COPY . .

RUN chmod +x ./gradlew && \
    ./gradlew build -x test --no-daemon

FROM eclipse-temurin:11-jre
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]