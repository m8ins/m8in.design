const postListItem = document.querySelector(".post-list__item");
const mainLink = card.querySelector(".post-list__link");

postListItem.addEventListener("click", handleClick);

function handleClick(event) {
  mainLink.click();
}
