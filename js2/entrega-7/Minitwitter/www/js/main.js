const inputText = document.querySelector("main form fieldset input");
const buttonForm = document.querySelector("main>form>button");
const main = document.querySelector("main");

function newArticle(event) {
  if (inputText.value !== "") {
    const article = document.createElement("article");
    const p = document.createElement("p");
    p.textContent = inputText.value;

    const pDate = document.createElement("p");
    const today = new Date();
    console.log(inputText.value);
    pDate.textContent =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("type", "button");
    buttonDelete.textContent = "Borrar";

    const div = document.createElement("div");
    article.append(div);
    div.append(p);
    div.append(pDate);
    article.append(buttonDelete);

    main.append(article);
    inputText.value = "";

    buttonDelete.addEventListener("click", () => {
      article.remove();
    });

    console.log(event.target);
    console.log(article);
  }
}

buttonForm.addEventListener("click", newArticle);
