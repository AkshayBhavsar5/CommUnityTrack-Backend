const {
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
} = require("../Controller/todoController");
const router = require("express").Router();

router.route("/addtodo").post(createTodo);
router.route("/getalltodo").get(getTodo);
router.route("/edittodo/:id").put(editTodo);
router.route("/deletetodo/:id").delete(deleteTodo);

module.exports = router;
