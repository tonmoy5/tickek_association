const express = require('express');
const router = express.Router();
const dataFormatterController = require('../controllers/dataFormatterController');

/**
 * @swagger
 * /format/text_to_number:
 *   post:
 *     summary: Convert text to number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully converted text to number
 *       500:
 *         description: Server error
 */
router.post('/text_to_number', dataFormatterController.textToNumber);

/**
 * @swagger
 * /format/number_to_text:
 *   post:
 *     summary: Convert number to text
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully converted number to text
 *       500:
 *         description: Server error
 */
router.post('/number_to_text', dataFormatterController.numberToText);

/**
 * @swagger
 * /format/whole_number:
 *   post:
 *     summary: Convert number to whole number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully converted number to whole number
 *       500:
 *         description: Server error
 */
router.post('/whole_number', dataFormatterController.wholeNumber);

/**
 * @swagger
 * /format/add_numbers:
 *   post:
 *     summary: Add two numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value_one:
 *                 type: number
 *               value_two:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully added numbers
 *       500:
 *         description: Server error
 */
router.post('/add_numbers', dataFormatterController.addNumbers);

/**
 * @swagger
 * /format/subtract_numbers:
 *   post:
 *     summary: Subtract two numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value_one:
 *                 type: number
 *               value_two:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully subtracted numbers
 *       500:
 *         description: Server error
 */
router.post('/subtract_numbers', dataFormatterController.subtractNumbers);

module.exports = router;
