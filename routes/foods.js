const express =  require('express')
const foodCalucation = require('../controllers/foodCal.js')
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Food
 *   description: API endpoints for managing food orders and delivery
 */

/**
 * @swagger
 * /api/deliveryprice:
 *   post:
 *     summary: Calculate the total price of food delivery alright then
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: The delivery zone.
 *               organization_id:
 *                 type: number
 *                 description: The organization ID.
 *               total_distance:
 *                 type: number
 *                 description: The total distance of delivery in kilometers only accepts the 1-30 KM.
 *               item_type:
 *                 type: string
 *                 description: The type of item (perishable/non-perishable).
 *             required:
 *               - zone
 *               - organization_id
 *               - total_distance
 *               - item_type
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 *                   description: The calculated total price of food delivery.
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */

// Your foodCalucation function definition here
router.post("/deliveryprice",foodCalucation)


module.exports =  router