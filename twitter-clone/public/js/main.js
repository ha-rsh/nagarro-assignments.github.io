const likeBtns = document.querySelectorAll(".like-btn");

likeBtns.forEach((likeBtn) => {
  likeBtn.addEventListener("click", (e) => {
    const likeIcon = e.target.firstElementChild;
    const likeCount = likeIcon.nextElementSibling;
    let isLiked = false;
    if(likeIcon.classList.toggle("fa-solid")){
        likeCount.innerText = parseInt(likeCount.innerText) + 1;
        isLiked = true;
    }
    else{
        likeCount.innerText = parseInt(likeCount.innerText) - 1;
        isLiked = false;
    }
    const data = {
        tweetId: e.target.getAttribute('data-tweetId'),
        userId: document.getElementById("userId").value,
        isLiked,
    };
    fetch("/tweet/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
    });
  });
});

document.querySelector("#tweet-form").addEventListener("submit", (e) => {
  if(document.getElementById("tweet").value===""){
    e.preventDefault();
  }
})

document.querySelectorAll(".delete-tweet").forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", () => {
    const tweetId = deleteBtn.getAttribute("data-tweet-id");
    const userId = deleteBtn.getAttribute("data-tweet-user");
    const data = {
      tweetId,
      userId,
    };
    fetch("/tweet/delete", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Request complete! response:", res);
    }).then(() => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  })
})