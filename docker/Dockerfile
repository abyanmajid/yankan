FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["../server/yankan.csproj", "yankan/"]
RUN dotnet restore "./yankan/yankan.csproj"
COPY . .
WORKDIR "/src/yankan"
RUN dotnet build "./yankan.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./yankan.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "yankan.dll"]
