var x1 = document.getElementById('button-click-1');
var x2 = document.getElementById('button-click-2');
x1.addEventListener('click',function1);
x2.addEventListener('click', function2);

function function1()
{
  let name =prompt('Are you sure you want to continue?');
  window.location.href = "ashpokemon.html";
}

function function2()
{
  let name =prompt('Are you sure you want to continue?');
  window.location.href = "Alainpokemon.html";
}