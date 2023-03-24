
The Movie API will be running on `http://localhost:3000`. You can now send requests to the API using tools like Postman or CURL, or you can integrate it with your frontend application.

## API Endpoints

### Get all movies

- Request: `GET /movies?page={page}&pageSize={pageSize}`
- Description: Fetches a list of movies with pagination. If `page` and `pageSize` query parameters are not provided, default values of 1 for `page` and 10 for `pageSize` will be used.
- Example: `GET http://localhost:3000/movies?page=1&pageSize=10`

### Get a specific movie by ID

- Request: `GET /movies/:id`
- Description: Fetches the details of a specific movie by its ID.
- Example: `GET http://localhost:3000/movies/1`

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Helmet](https://helmetjs.github.io/) - Security middleware for setting HTTP headers
- [Compression](https://github.com/expressjs/compression) - Middleware for compressing response bodies

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
