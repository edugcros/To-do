const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  updatedUser,
  deleteaUser,
  getaUser,
  getallUser,
  updatePassword,
} = require("../controller/authUser");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getallUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/logout", authMiddleware, logout);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/password", authMiddleware, updatePassword);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        firstname:
 *          type: string
 *          description: the user name
 *        email:
 *          type: string
 *          description: the user email
 *        password:
 *          type: string
 *          description: the user password
 *        role:
 *          type: string
 *          description: the user role can be user or admin
 */

// Create User
/**
 * @swagger
 * /api/user/register:
 *  post:
 *    summary: create new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: new user created!
 */

// Login User
/**
 * @swagger
 * /api/user/login:
 *  post:
 *    summary: login
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: logged in user!
 */

//Get All User
/**
 * @swagger
 * /api/user/all-users:
 *  get:
 *    summary: return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

// Get a user
/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *    summary: return a users (admin)
 *    tags: [User]
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
 *        description: a user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user not found
 */
// Delete user
/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *    summary: delete a users (admin)
 *    tags: [User]
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
 *        description: user deleted
 *      404:
 *        description: user not found
 */
// Put user
/**
 * @swagger
 * /api/user/edit-user:
 *  put:
 *    summary: update a users
 *    tags: [User]
 *    security:
 *     - Authorization: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - true
 *            properties:
 *              firstName:
 *                type: string
 *                default: ''
 *              email:
 *                type: string
 *                default: ''
 *              role:
 *                type: string
 *                default: ''
 *    responses:
 *      200:
 *        description: user update!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user not found
 */
//put password
/**
 * @swagger
 * /api/user/password:
 *  put:
 *    summary: update password
 *    tags: [User]
 *    security:
 *     - Authorization: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - true
 *            properties:
 *              password:
 *                type: string
 *                default: ''
 *    responses:
 *      200:
 *        description: user update!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user not found
 */