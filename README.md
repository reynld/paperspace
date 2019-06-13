# Paperspace Notifier

Sample project for Paperspace

### [Demo](https://ps-notifier.netlify.com/)

### [Gist Used](https://gist.githubusercontent.com/reynld/d618a3acd79e0e7b459fb79bf28b4615/raw/0fbb9b7b41e0a8179c4bdb9170224f37295f0c61/ps_notifier.md)

## Gist format

```
# TITLE [optional]
### Alert title:        string
### Alert date:         string(MM/DD/YYYY)
### Tag                 string(new, improvements)
### Index for image:    number(0-2)
BODY:                   string
### Alert title:        string
....
```

## Backend enviroment variabled

`PORT` - port to run server

`GIST_URL` - url to github gist (see gist format above)

#### Suggested

```
PORT="9001"
GIST_URL=https://gist.githubusercontent.com/reynld/d618a3acd79e0e7b459fb79bf28b4615/raw/0fbb9b7b41e0a8179c4bdb9170224f37295f0c61/ps_notifier.md
```

## Frontend enviroment variables

`REACT_APP_BACKEND_URL` - backend url

#### Suggested (if running locally)

```
REACT_APP_BACKEND_URL=http://localhost:9001/alerts
```

## How to run

#### Set both frontend and backend enviroment variables

#### Run backend

`npm run start:backend`

#### Run frontend

`npm run start:frontend`
