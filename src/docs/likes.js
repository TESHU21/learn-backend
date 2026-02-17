/**
 * @swagger
 * /api/v1/likes/{postId}:
 *   post:
 *     summary: React to a post
 *     tags:
 *       - Reaction
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Reaction"
 *     responses:
 *       201:
 *         description: Reaction added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/v1/likes/{postId}:
 *   get:
 *     summary: Get all reactions for a post
 *     tags:
 *       - Reaction
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Reaction"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/v1/likes/{postId}:
 *   delete:
 *     summary: Remove reaction from a post
 *     tags:
 *       - Reaction
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reaction removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reaction not found
 */
