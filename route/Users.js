import express from "express";
import {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getUsers
} from "../controllers/UserController.js"
const routes = express.Router();

routes.post('/', createUser)
routes.delete('/:id', deleteUser)
routes.put('/:id', updateUser)
routes.get('/:id', getUser)
routes.get('/', getUsers)


export default routes