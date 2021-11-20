
# Gastos Backend

Gastos is a expense tracker that uses modern javascript libaries to visualize the expenses
that the user gives to us.




## API Reference

#### Users:

| Method   | URL                | Description                                                                                                |
| ------   | --------------     | ---------------------------------------------------------------------------------------------------------- |
| [GET]   | /api/users | Returns a list of all the current users in the database. [ONLY FOR DEV PURPOSES]                                      |
| [GET]   | /api/users/${id}   | Return the profile for the user given. [ONLY FOR DEV PURPOSES]                                                     |

## Run Locally

Clone the project

```bash
  git clone https://github.com/MikeLikesCode/gastos-backend.git
```

Go to the project directory

```bash
  cd gastos-backend
```

Install dependencies

```bash
  npm install
```

Start the docker container

```bash
  docker compose up
```

Start the server

```bash
  npm run server
```

