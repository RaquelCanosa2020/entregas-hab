const inputText = document.querySelector("main form input");
const form = document.querySelector("main form");
const section = document.querySelector("main section");

const today = new Date();

let tweets = [];

const localTweets = JSON.parse(window.localStorage.getItem("tweets"));

if (localTweets) {
  tweets = localTweets;
}

function newArticle() {
  section.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let index = 0;

  for (const tweet of tweets) {
    const article = document.createElement("article");
    const p = document.createElement("p");
    p.textContent = tweet.text;

    const pDate = document.createElement("p");

    pDate.textContent = tweet.date;

    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("data-index", index);
    buttonDelete.setAttribute("type", "button");
    buttonDelete.textContent = "Borrar";

    const div = document.createElement("div");
    div.append(p);
    div.append(pDate);
    article.append(div);
    article.append(buttonDelete);
    fragment.append(article);
    index++;
  }

  section.append(fragment);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputText.value.length === 0 || inputText.value.length > 250) {
    alert("entre 1 y 250 caracteres");
  } else {
    tweets.unshift({
      text: inputText.value,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    });

    window.localStorage.setItem("tweets", JSON.stringify(tweets));

    inputText.value = "";
    newArticle();
  }
});

section.addEventListener("click", (event) => {
  const target = event.target;

  if (target.matches("article > button")) {
    const index = target.getAttribute("data-index");
    tweets.splice(index, 1);

    window.localStorage.setItem("tweets", JSON.stringify(tweets));

    newArticle();
  }
});
newArticle();
