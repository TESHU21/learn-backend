/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     description: This endpoint allows a user to log in using email and password.
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: teshu11@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234567
 *
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint registers a new user account.
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *
 *             properties:
 *               username:
 *                 type: string
 *                 example: Teshome
 *
 *               email:
 *                 type: string
 *                 example: teshome@example.com
 *
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *
 *       400:
 *         description: All fields are required
 *
 *       409:
 *         description: User already exists
 */
/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout a logged-in user
 *     description: This endpoint logs out the currently authenticated user.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: User logged out successfully
 *
 *       401:
 *         description: Unauthorized - User is not logged in
 *
 *       500:
 *         description: Internal server error
 */
