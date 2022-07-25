const btn1 = document.querySelector("#btn1")
const btn2 = document.querySelector("#btn2")
const btn3 = document.querySelector("#btn3")
const btn4 = document.querySelector("#btn4")
const subContainer = document.querySelector(".sub-container")
const para = document.querySelector("#para")

btn1.onclick = () => {
    document.body.style = "background:black";
    subContainer.style = "border: 2px solid white; background-color: black;"
    para.style = "color: white;"
}

btn2.onclick = () => {
    document.body.style = "background:rgb(43, 204, 32)";
    subContainer.style = "border: 2px solid black; background-color: rgb(43, 204, 32);"
    para.style = "color: black;"
}

btn3.onclick = () => {
    document.body.style = "background:rgb(228, 240, 10)";
    subContainer.style = "border: 2px solid black;  background-color: rgb(228, 240, 10);"
    para.style = "color: black;"
}

btn4.onclick = () => {
    document.body.style = "background:rgb(10, 137, 240)";
    subContainer.style = "background-color: rgb(10, 137, 240);  border: 2px solid white;"
    para.style = "color: white;"
}
