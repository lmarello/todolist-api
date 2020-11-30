import { Router } from 'express'
import * as todoController from '../controllers/todo.controller'

const router = Router()

router.get('/', todoController.getToDos)
router.get('/:id', todoController.getToDoById)
router.post('/', todoController.createToDo)
router.put('/:id', todoController.updateToDoById)
router.delete('/:id', todoController.deleteToDoById)

export default router
