/**
 * @swagger
 * /api/v1/comment/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     description: This endpoint allows a user to add a comment to a specific post.
 *     tags:
 *       - Comments
 *
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comment"
 *
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *
 *       400:
 *         description: Bad request. Missing or invalid parameters
 *
 *       404:
 *         description: Post not found
 */

/** @swagger
 * /api/v1/comment/post/{postId}:
 *   get:
 *     summary: Get all comments of a posts
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     security:
 *       - bearerAuth: []  # Authorization required
 *     responses:
 *       200:
 *         description: Comment fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post Not Found
 */
/**
 * @swagger
 * /api/v1/comment/{commentId}/:
 *   get:
 *     summary: Get a single Comment By ID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []   # 🔑 Authorization required
 *     parameters:
 *       - in: path
 *         name: commentId
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
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /api/v1/posts/comment/{commentId}:
 *   patch:
 *     summary: Update an existing comment
 *     description: This endpoint updates a comment using its ID.
 *     tags:
 *       - Comments
 *
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to update
 *         schema:
 *           type: string
 *           example: 64fbc12a9c12ab1234567890
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comment"
 *
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *
 *       404:
 *         description: Comment not found
 *
 *       400:
 *         description: Invalid request data
 */

/**
 * @swagger
 * /api/v1/comment/{commentId}:
 *   delete:
 *     summary: delete an existing comment
 *     description: This endpoint updates a post using its ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *           example: 123456
 *
 *
 *
 *     responses:
 *       200:
 *         description: Comment Deleeted successfully
 *       404:
 *         description: Comment not found
 *
 *       400:
 *         description: Invalid request Comment Id
 */
