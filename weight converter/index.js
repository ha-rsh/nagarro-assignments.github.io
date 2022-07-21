const btn = document.querySelector('#btn')

btn.onclick = () =>{
    data = document.querySelector('#input');
    console.log(data)
    ans = (data.value) / 1000;
    h3 = document.querySelector('#converted');
    h3.innerText = `value in Kg: ${ans}`
}
