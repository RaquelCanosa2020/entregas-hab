const minimist = require("minimist");
const {
  addTodo,
  markAsDone,
  markAsUnDone,
  listTodos,
  cleanTodos,
} = require("./lib/actions");

async function todoList() {
  const args = minimist(process.argv.slice(2));

  const { _, priority, list, done, undone, clean } = args;

  //console.log(args);

  if (list) {
    await listTodos();

    process.exit();
  }

  if (done) {
    await markAsDone(done);

    // Marcar el todo número "done" como hecho

    //console.log(`La tarea ${done} se ha marcado como HECHO`);

    process.exit();
  }

  if (undone) {
    await markAsUnDone(undone);
    // Marcar el todo número "undone" como no hecho
    console.log(`La tarea ${undone} se ha marcado como PENDIENTE`);
    process.exit();
  }

  if (clean) {
    // Borro de la lista todos hechos
    await cleanTodos();

    process.exit();
  }

  const newTodo = _.join(" ");

  if (newTodo.length > 0) {
    // Añadir newTodo a la lista
    await addTodo({
      text: newTodo,
      priority: priority ? true : false,
    });

    process.exit();
  } else {
    console.log("Nada que hacer");
  }
}

todoList();
