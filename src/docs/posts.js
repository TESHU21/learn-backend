/**
 * @swagger
 * /api/v1/posts/create:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 */

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []  # Authorization required
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post Not Found
 */
/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Get a single post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []   # 🔑 Authorization required
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/v1/posts/update/{id}:
 *   patch:
 *     summary: Update an existing post
 *     description: This endpoint updates a post using its ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *           example: 123456
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the post
 *                 example: Updated Post Name
 *               description:
 *                 type: string
 *                 description: Updated description of the post
 *                 example: This post has been updated successfully.
 *               age:
 *                 type: integer
 *                 description: Updated age value
 *                 example: 10
 *
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123456
 *                 name:
 *                   type: string
 *                   example: Updated Post Name
 *                 description:
 *                   type: string
 *                   example: This post has been updated successfully.
 *                 age:
 *                   type: integer
 *                   example: 10
 *
 *       404:
 *         description: Post not found
 *
 *       400:
 *         description: Invalid request data
 */
