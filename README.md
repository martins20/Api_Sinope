<p align="center">
  <img src="https://github.com/vmnog/sinope/blob/master/assets/money.png?raw=true" alt="Sinope" width=150 />
  <br />
  An expenses and Income money manager app
</p>

## 📜 Code standardization

- Commitlint
- Husky
- Commitzen
- Eslint
- Prettier

## 💾 Backend

- Sequelize
- Postgres
- Docker
- Bcrypt
- JWT
- DotEnv
- Multer

## How to run

<b>Clone the project</b>

```
$ git clone https://github.com/vmnog/sinope.git
```

<b>Change directory to the project</b>

```
$ cd sinope

```

<b>Install all dependencies</b>

```
$ yarn install
```

### Postgres Docker

<b>Start / Create your <a href="https://hub.docker.com/_/postgres">Docker Postgres</a> Container:</b>

```
$ docker run --name sinope -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

<b>Run the server on sinope folder</b>

```
$ yarn start

```

### Sequelize Postgres

<b>Run all migrations</b>

```
$ yarn sequelize db:migrate
```

### Insomnia

Import Insomnia settings from root folder.

### Postbird

Use postbird to display database
