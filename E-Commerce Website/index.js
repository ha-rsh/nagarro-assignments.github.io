window.onload = function(){
        
    window.onscroll = () => {
        if (pageYOffset >= 200) document.getElementById('btn-back-to-top').style.visibility = "visible";
        
        else document.getElementById('btn-back-to-top').style.visibility = "hidden";
    };

    document.getElementById('btn-back-to-top').onclick = function()
    {
        scrollTo(document.body, 0, 0);
    }

    const timerInterval = setInterval(() => {
        const current = new Date();
        let hr = current.getHours();
        let min = current.getMinutes();
        let sec = current.getSeconds();
        sec = 60-sec;
        min = 60-min;
        min = sec===0?min:min-1;
        hr = 24-hr;
        hr = (min===0&&sec===0)?hr:hr-1;
        document.querySelector('.hour').innerText = hr.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"hr";
        document.querySelector('.minute').innerText = min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"min";
        document.querySelector('.seconds').innerText = sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"sec";
    },1000);

    const msInterval = setInterval(() => {
        document.querySelector('.milisecond').innerText = 1000-new Date().getMilliseconds();
    }, 1);
}
