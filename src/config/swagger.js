import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learn Backend API",
      version: "1.0.0",
      description: "Professional API documentation using Swagger",
    },

    servers: [
      {
        url: "http://localhost:4000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Post: {
          type: "object",
          required: ["name", "description", "age"],
          properties: {
            name: {
              type: "string",
              example: "My first post",
            },
            description: {
              type: "string",
              example: "This is a post",
            },
            age: {
              type: "number",
              example: 25,
            },
            author: {
              type: "string",
              example: "userId123",
            },
            status: {
              type: "string",
              example: "pending",
            },
          },
        },

        User: {
          type: "object",
          properties: {
            username: {
              type: "string",
              example: "Teshome",
            },
            email: {
              type: "string",
              example: "teshome@example.com",
            },
            password: {
              type: "string",
              example: "1234567",
            },

            role: {
              type: "string",
              example: "admin",
            },
          },
        },

        Comment: {
          type: "object",
          required: ["text"],
          properties: {
            text: {
              type: "string",
              example: "Good Boy!",
            },
          },
        },
        Reaction: {
          type: "object",
          required: ["type"],
          properties: {
            type: {
              type: "string",
              description: "Reaction type for a post",
              enum: ["like", "love", "haha", "wow", "sad", "angry"],
              example: "love",
            },
          },
        },
      },
    },

    security: [{ bearerAuth: [] }],
  },

  apis: ["./src/docs/**/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
