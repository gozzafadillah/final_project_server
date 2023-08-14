## Midterm tokopedia play

Pada midterm ini saya membuat restapi dengan integrasi mongoDB untuk databasenya. Teknologi dan Library yang saya gunakan

- [x] Express.js
- [x] bcryptjs
- [x] jsonwebtoken
- [x] mongoose
- [x] nodemon
- [x] dotenv

## How to run app

1. `npm install ` or `npm ci`
2. insert `.env` database and jwt key
3. and `npm run dev` for run a server

## Database Structure

![img erd](./erd-midterm.png)

- Videos 1 - N Comments
- videos 1 - N Products
- User 1 - N Comments

# API List

## Videos

**_Video object_**

```yaml
{
title: string
videoUrl: string
urlImageThumbnail: string
}
```

- ## GET /videos

  Retrieves all videos in the system.

  - **_URL Params_**
    None
  - **_Headers_**
    None
  - **_Success Response:_**
    `Code: 200`
  - **_Content:_**

    ```yml
    {
      "count": 5,
      "videos":
        [
          {
            "videoID": "64bfe42736a3ba8369906eb3",
            "title": "cek",
            "urlImageThumbnail": "cek.jpg",
            "videoUrl": "cek.mp4",
          },
          {
            "videoID": "64bff0fbdb78f8cc5dd7609d",
            "title": "thumbnail-2",
            "urlImageThumbnail": "cek2.jpg",
            "videoUrl": "ccek.mp4",
          },
          {
            "videoID": "64c2928ed8d63c0aab1fb2c7",
            "title": "thumbnail-4",
            "urlImageThumbnail": "cek3.jpg",
            "videoUrl": "cek3.mp4",
          },
          {
            "videoID": "64c29343d8d63c0aab1fb2ca",
            "title": "thumbnail-4",
            "urlImageThumbnail": "cek3.jpg",
            "videoUrl": "cek3.mp4",
          },
          {
            "videoID": "64c29b2f6b760b4aa7d20ce3",
            "title": "Peralatan Dapur",
            "urlImageThumbnail": "gambar-thumbnail.jpg",
            "videoUrl": "peralatan-video.yt",
          },
        ],
    }
    ```

- ### POST /videos

  Creates a new video in the system.

  - **_URL Params_**
    None
  - **_Data Params_**
    ```yml
    { "title": string, "urlImageThumbnail": string, "videoUrl": string }
    ```
  - **_Headers_**
  - **_Content-Type: application/json_**
  - **_Success Response:_**
    Code: 200
  - **_Content:_**

  ```yml
  { message: "Video created successfully" }
  ```

- **_GET /videos/:id_**
  Retrieves a specific video by its ID.

  - **_URL Params_**
    id (string) - ID of the video to retrieve.
  - **_Headers_**
    None
  - **_Success Response:_**
    Code: 200
  - **_Content:_**
    ```yml
    {
      "message": "Get video successfully",
      "video": { "title": "thumbnail-4", "videoUrl": "cek3.mp4" },
      "product": [products],
    }
    ```

## Users

**_User object_**

```yaml
{
  username: string
  email: string
  password: string
  img: string
}
```

- ### POST /signup

  Creates a new user account.

  - **_URL Params_**
    None
  - **_Data Params_**
    ```yml
    { "email": string, "username": string, "password": string, "img": string }
    ```
  - **_Headers_**
  - **_Content-Type: application/json_**
  - **_Success Response:_**
    Code: 200
  - **_Content:_**

  ```yml
  { message: "User created successfully" }
  ```

  - **_Error Response:_**
  - **_Code: 400_**
  - **_Content:_** { "error": "E11000 duplicate key error collection: tokopedia_play.users index: email_1 dup key: { email: \"gozzafadillah@gmail.com\" }" }

- ### POST /signin

  Signs in a user.

  - **_URL Params_**
    None
  - **_Data Params_**
    `yml
        {
"email": string,
"password": string
}
`

  - **_Headers_**
  - **_Content-Type:_** application/json
  - **_Success Response:_**
  - **_Code:_** 200
  - **_Content:_**

    ```yml
    { message: "User signed in successfully" }
    ```

  - **_Error Response:_**
  - **_Code:_** 401
  - **_Content:_** { "error": "Invalid credentials" }

- ### GET /signin

  Get Profile User By Token

  - **_URL Params_**
    None
  - **_Data Params_**
    `yml
        {
"email": string,
"password": string
}
`

  - **_Headers_**

    - **_Content-Type:_** application/json
    - **_Authorization:_** Bearer
    - **_Success Response:_**
    - **_Code:_** 200
    - **_Content:_**

    ```yml
    {
      "message": "Get user successfully",
      "user": {
          "email": "gozzafadillah@gmail.com",
          "username": "gozza",
          "_id": "64c283dd3df7a34c1f0cb3bb",
          "img": "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
    }

    ```

  - **_Error Response:_**
  - **_Code:_** 401
  - **_Content:_** { "error": "Invalid credentials" }

## Comments

Comment object

```yml
  {
  comment: string
  username: string
  email: string
  videoId: string
  }
```

## Comments

- ### POST /comments

  Creates a new comment on a video.

      - **_URL Params_**
        None
      - **_Data Params_**

      ```yml
      { "comment": string }
      ```

  - **_Headers_**
    - none
  - **_Content-Type:_** application/json
  - **_Success Response:_**
  - **_Code:_** 200
  - **_Content:_**

  ```yml
  { message: "Comment created successfully" }
  ```

- ### GET /comments/:videoId

  Retrieves all comments in the system.

  - **_URL Params_**
    None
  - **_Headers_**
    None
  - **_Success Response:_**
  - **_Code:_** 200
  - **_Content:_**

  ```yml
    {
    comments: [
    {
    comment: "Comment 1",
    username: "user1",
    email: "video1",
    },
    {
    comment: "Comment 2",
    username: "user2",
    email: "video1",
    }
    // More comments...
    ]
    }
  ```

## Product

- ### POST /product/:videoId

  Creates a new product related to a specific video.

  - **_URL Params_**
    videoId (string) - ID of the video to associate the product with.
  - **_Data Params_**

  ```yml
  { "videoId": string"name": string, "price": number, "description": string }
  ```

  - **_Headers_**
    - Authorization: `Bearer <token>`
  - **_Content-Type:_** application/json
  - **_Success Response:_**
    Code: 200
  - **_Content:_**
    ```
      {
        message: "Product created successfully",
      }
    ```
