let count = 1;
setInterval(()=>{
    document.getElementById("btn" + count).checked = true;
    document.body.style.transition = "1s ease-in";
    document.body.style.background = `url('Images/bg-image${count}.jpg') center center / cover`;
    document.body.style.transition = "2s ease-out";
    count++;
    if (count>4) count = 1
}, 5000);

