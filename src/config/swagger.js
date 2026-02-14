import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "Learn Backend API",
      version: "1.0.0",
      description: "Professional API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:4000", // Your backend base URL
      },
    ],
    components: {
      securitySchemes: {
        // JWT support
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // Reusable objects
        Post: {
          type: "object",
          properties: {
            name: { type: "string", example: "My first post" },
            description: { type: "string", example: "This is a post" },
            age: { type: "number", example: 25 },
            author: { type: "string", example: "userId123" },
            status: { type: "string", example: "pending" },
          },
        },
        User: {
          type: "object",
          properties: {
            username: { type: "string", example: "Teshome" },
            email: { type: "string", example: "teshome@example.com" },
            role: { type: "string", example: "admin" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }], // Global JWT protection
  },
  apis: ["./src/docs/**/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
