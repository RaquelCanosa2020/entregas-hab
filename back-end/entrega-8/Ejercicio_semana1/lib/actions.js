const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");
const chalk = require("chalk");

const todoFile = path.join(os.homedir(), ".tasks.json");

// Lee la lista de todos y devuelve el contenido
async function readTodoList() {
  try {
    let todos;

    try {
      const todoListContent = await fs.readFile(todoFile);
      todos = JSON.parse(todoListContent.toString());
    } catch (error) {
      todos = { todos: [] };
      await fs.writeFile(todoFile, JSON.stringify(todos));
    }

    return todos;
  } catch (error) {
    console.error(error);
  }
}

// Guarda la lista de todos
async function saveTodos(todoList) {
  try {
    await fs.writeFile(todoFile, JSON.stringify(todoList));
  } catch (error) {
    console.error(error.message);
  }
}

async function addTodo({ text, priority }) {
  try {
    //console.log(text, priority);
    // Abrir la lista actual de todos
    const currentList = await readTodoList();

    const now = new Date();
    const dateCreation = now.toISOString();

    currentList.unshift({
      //.todos
      text,
      priority,
      dateCreation,
    });
    console.log(`Se ha añadido la tarea "${currentList[0].text}"`);

    await saveTodos(currentList);
    // Añadir el todo que recibe al principio
    // Guardar la lista actualizada
  } catch (error) {
    console.error("error al añadir tarea");
  }
}

async function markAsDone(index) {
  try {
    // Abrir la lista actual de todos
    const currentList = await readTodoList();

    // Buscar el todo con el index que recibe

    // Modificar el objecto del todo como done: true

    currentList[index - 1].done = true; //.todos
    currentList[index - 1].undone = false;
    console.log(`La tarea ${index} se ha marcado como HECHO`);
    // Guardar la lista actualizada
    await saveTodos(currentList);
  } catch (error) {
    console.error("el índice es erróneo");
  }
}

async function markAsUnDone(index) {
  try {
    // Abrir la lista actual de todos
    const currentList = await readTodoList();

    // Buscar el todo con el index que recibe

    // Modificar el objecto del todo como done: true

    currentList[index - 1].done = false;
    currentList[index - 1].undone = true;

    // Guardar la lista actualizada
    await saveTodos(currentList);
  } catch (error) {
    console.error("el índice es erróneo");
  }
}

async function listTodos() {
  try {
    // Abrir la lista actual de todos
    const lista = await readTodoList();

    // Imprimir la lista en la consola

    if (lista.length === 0) {
      console.error("no hay ninguna tarea");
    } else {
      console.log(chalk.magenta.bold.underline("LISTA DE TAREAS:"));

      for (const task of lista) {
        if (task.priority === false) {
          task.text = chalk.blue(`${task.text}`);
          task.priority = "";
        } else {
          task.text = chalk.red.bgWhite.bold(`${task.text}`);
          task.priority = chalk.red(", prioridad alta 🔴");
        }

        if (task.done === true) {
          task.done = chalk.green("hecha 👍");
        } else {
          task.done = chalk.yellow.underline("pendiente ⏳");
        }

        const humanDistance = formatDistanceToNow(new Date(task.dateCreation), {
          locale: es,
        });

        console.log(
          `${lista.indexOf(task) + 1}: ${task.text} (${task.done}${
            task.priority
          })- ${humanDistance}`
        );
      }
    }
  } catch (error) {
    console.error("error al listar las tareas");
  }
}

async function cleanTodos() {
  try {
    // Abrir la lista actual de todos
    const currentList = await readTodoList();
    // Filtrar los que están marcados como done: true (hago al revés, filtro por los que aún están sin hacer)
    //console.log(currentList);

    const todosPendientes = currentList.filter((task) => {
      //todos
      return task.done === false || !task.done;
    });

    console.log("se han borrado las tareas realizadas");

    // Guardar la lista resultant

    await saveTodos(todosPendientes);
  } catch (error) {
    console.error("error al borrar");
  }
}

module.exports = {
  addTodo,
  markAsDone,
  markAsUnDone,
  listTodos,
  cleanTodos,
};
