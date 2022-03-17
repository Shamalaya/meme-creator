Simple project for a meme generator that uses React NodeJs Express and REST api.

## React Client Application Routes

- Route `/`: homepage with a list of memes.
- Route `/login`: page with the login form.
- Route `/new` page for choosing a template for a new meme.
- Route `/new/:id` page with a form to create a new meme. :id is the id of the selected template.
- Route `/copy/:id` page with a form to copy an existing meme.
- Route `/memes/:id` page to display an existing meme. :id is the id of the selected meme.

## API Server

#### Get all memes

- HTTP method: `GET` URL: `/api/memes`
- Description: Get the full list of memes if logged in or, if not, only the non protected ones
- Request body: _None_
- Response: `200 OK` (success)
- Response body: Array of objects, each describing one meme:

```JSON
[{
    "id": 2,
    "template_id": "Go for a walk",
    "user_id": 1,
    "user_name": "Mario",
    "title": "Titolo",
    "texts": ["testo1", "testo2", "testo3"],
    "font": "Arial",
    "color": "Black",
    "protected": true
}]
```

- Error responses: `500 Internal Server Error` (generic error)

#### Get all Templates

- HTTP method: `GET` URL: `/api/memes`
- Description: Get the full list of memes if logged in, or if not logged, only the non protected ones
- Request body: _None_
- Response: `200 OK` (success)
- Response body: Array of objects, each describing one template:

```JSON
[{
    "id": 2,
    "url": "/immagine.jpg",
    "fontSize": 10,
    "textAreaNumber": 3,
    "textAreas": [["text0_top","text0_left", "text0_width"], ["text1_top", "text1_left", "text1_width"], ["text2_top", "text2_left", "text2_width"]]
}]
```

- Error responses: `500 Internal Server Error` (generic error)

### Add a new meme

- HTTP method: `POST` URL: `/api/memes`
- Description: Add a new meme for a logged user
- Request body: description of the object to add

```JSON
{
    "templateId": 20,
    "title": "meme",
    "text": ["text1","tex2","text3"],
    "font": "Arial",
    "color": "Black",
    "protected": true
}
```

- Response: `200 OK` (success)
- Response body: the object as represented in the database

- Error responses: `422 Unprocessable Entity` (values do not satisfy validators), `503 Service Unavailable` (database error)

### Delete an existing meme

- HTTP method: `DELETE` URL: `/api/memes/:id`
- Description: Delete an existing meme of the logged user
- Request body: _None_

- Response: `200 OK` (success)
- Response body: an empty object

- Error responses: `503 Service Unavailable` (database error)

### User management

#### Login

- HTTP method: `POST` URL: `/api/sessions`
- Description: authenticate the user who is trying to login
- Request body: credentials of the user who is trying to login

```JSON
{
    "username": "username",
    "password": "password"
}
```

- Response: `200 OK` (success)
- Response body: authenticated user

```JSON
{
    "id": 1,
    "username": "john.doe@polito.it",
    "name": "John"
}
```

- Error responses: `500 Internal Server Error` (generic error), `401 Unauthorized User` (login failed)

#### Check if user is logged in

- HTTP method: `GET` URL: `/api/sessions/current`
- Description: check if current user is logged in and get her data
- Request body: _None_
- Response: `200 OK` (success)

- Response body: authenticated user

```JSON
{
    "id": 1,
    "username": "john.doe@polito.it",
    "name": "John"
}
```

- Error responses: `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)

#### Logout

- HTTP method: `DELETE` URL: `/api/sessions/current`
- Description: logout current user
- Request body: _None_
- Response: `200 OK` (success)

- Response body: _None_

- Error responses: `500 Internal Server Error` (generic error), `401 Unauthorized User` (user is not logged in)

## Database Tables

- Table `user` - contains id, email, name, hash
- Table `meme` - contains id, template_id, user_id, user_name, title, text0, text1, text2, font, color, protected
- Table `template` - contains id, url, font_size, text_areas, text0_top, text0_left, text0_width, text1_top, text1_left, text1_width, text2_top, text2_left, text2_width

## Main React Components

- `Login` (in `Login.js`): Component with login form
- `MemeCreator` (in `MemeCreator.js`): Component for display an existing meme
- `MemeForm` (in `MemeForm`): Component with the form to create or copy a new meme
- `MemeList` (in `MemeList`): Component to show a list of existing memes -`NavigationBar` (in `NavigationBar`): Component for a navbar -`TemplateSelect` (in `TemplateSelect`): Component that shows all the meme templates

## Screenshot

![Screenshot](./img/screenshot.png)

## Users Credentials

- dario@polito.it, "password"
- marco@polito.it, "password"
- angelo@polito.it "password"
