const { Router } = require('express');
const todosController = require('../../controllers').todos;

const router = Router();

router.get('/', todosController.list);
router.post('/add-todo', todosController.create);
router.put('/:todoId', todosController.update);
router.delete('/:todoId', todosController.destroy);

module.exports = router;
