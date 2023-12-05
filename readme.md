# Решение тестового задания

Приложение на NestJS с возможностью регистрации, логина, загрузки картинок(аватарок), генерации пдф(страниц пользователей).

## Что использовалось

Использовались Prisma как ORM, NestJS с TS для сервера, PostgreSQL для базы данных. Так же добавил JWT и хеширование паролей.

## Running

Можно запустить локально имея только postgresql в docker (можно воспользоваться docker-compose.localserver.yml). Для этого понадобится переменная:
`DATABASE_URL`

Запускаем postgreSQL, затем делаем:

```shell
npm install
npx prisma migrate dev
npm run start
```

Можно так же развернуть и сервер, и бд в docker:

```shell
docker-compose -f docker-compose.both.yml up
```

## API

#### Sign Up

```http
  POST /signup
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `email`     | `string` | **Required** |
| `password`  | `string` | **Required** |
| `firstName` | `string` | **Required** |
| `lastName`  | `string` | **Required** |

#### Sign In

```http
  POST /signin
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Uploading image

```http
  POST /image
```

Надо установить bearer token для jwt и отправлять картинку с ключом "image" через форму (form-data в postman)

#### Generating pdf

```http
  GET /pdf
```

Возвращает сообщение о статусе операции. Если пдф ещё не было вернёт "pdf generated", иначе - "pdf is already generated".
