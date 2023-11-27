const express = require("express");
const {
  createNewNote,
  getAllNote,
  getNote,
  deleteNote,
  updateNoteDone,
  updateNote,
} = require("../controller/note");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createNewNote);
router.get("/allnote", getAllNote);
router.get("/:id", authMiddleware, getNote);
router.delete("/:id", authMiddleware, deleteNote);
router.put("/edit-note/:id", authMiddleware, updateNote);
router.put("/done/:id", authMiddleware, updateNoteDone);

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Note:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: note title
 *        description:
 *          type: string
 *          description: note description
 *        norder:
 *          type: number
 *          description: note order
 *        done:
 *          type: boolean
 *          default: 'false'
 *          description: note status
 */

// Create note
/**
 * @swagger
 * /api/note:
 *  post:
 *    summary: create new note
 *    tags: [Note]
 *    security:
 *      - Authorization: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Note'
 *    responses:
 *      200:
 *        description: new note created!
 */

//Get All Note (/api/note/allnote/?sort=norder: || norder[gte]=2)
/**
 * @swagger
 * /api/note/allnote:
 *  get:
 *    summary: return all notes
 *    tags: [Note]
 *    responses:
 *      200:
 *        description: all notes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Note'
 *      404:
 *        description: not found
 */

// Get a note
/**
 * @swagger
 * /api/note/{id}:
 *  get:
 *    summary: return a note
 *    tags: [Note]
 *    security:
 *      - Authorization: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: a note
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Note'
 *      404:
 *        description: not found
 */

// Delete note
/**
 * @swagger
 * /api/note/{id}:
 *  delete:
 *    summary: delete note
 *    tags: [Note]
 *    security:
 *      - Authorization: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: note deleted
 *      404:
 *        description: not found
 */

// Put Note
/**
 * @swagger
 * /api/note/edit-note/{id}:
 *  put:
 *    summary: update a note
 *    tags: [Note]
 *    security:
 *     - Authorization: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - true
 *            properties:
 *              title:
 *                type: string
 *                default: ''
 *              description:
 *                type: string
 *                default: ''
 *              norder:
 *                type: string
 *                default: ''
 *    responses:
 *      200:
 *        description: note update!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Note'
 *      404:
 *        description: not found
 */

// Put Done Note
/**
 * @swagger
 * /api/note/done/{id}:
 *  put:
 *    summary: update done note
 *    tags: [Note]
 *    security:
 *     - Authorization: []
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: user update!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Note'
 *      404:
 *        description: not found
 */