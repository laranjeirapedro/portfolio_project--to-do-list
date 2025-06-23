# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia tudo para dentro da imagem
COPY . ./

# Restaura as dependências e publica a aplicação
RUN dotnet restore ./ToDoApi/ToDoApi.csproj
RUN dotnet publish ./ToDoApi/ToDoApi.csproj -c Release -o out

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copia a aplicação já publicada
COPY --from=build /app/out .

# Define a porta esperada pelo Render
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

# Comando de inicialização
ENTRYPOINT ["dotnet", "ToDoApi.dll"]