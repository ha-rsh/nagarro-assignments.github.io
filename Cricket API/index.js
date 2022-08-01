const apikey = "70fb72e4-41eb-4713-be25-67c89aeaac08";
const cricapiurl = "https://api.cricapi.com/v1/cricScore?apikey=" + apikey;


let maindata = document.getElementById("#maindata");
const xhr = new XMLHttpRequest();
xhr.open("GET", cricapiurl, true);
substituteimage = "https://media.gettyimages.com/vectors/cricket-logo-vector-id467029165?s=2048x2048";
xhr.onload = () =>{
    if (xhr.status === 200) {
        let fetcheddata = JSON.parse(xhr.responseText);
        teamdata = fetcheddata.data;
        teamdata = teamdata.slice(34, 82)
        teamdata.forEach((value, index) => {
            element = document.createElement('div');
            element.className = "cricket-card";
            element.id = `${value.id}`;
            document.getElementById("maindata").append(element);

            element2 = document.createElement('div')
            element2.className = 'cricket-card-image';
            element.appendChild(element2);

            image = document.createElement('img')
            image.src = `${value.t1img ||  substituteimage}`;
            element2.appendChild(image);

            image2 = document.createElement('img')
            image2.src = `${value.t2img || substituteimage}`;
            element2.appendChild(image2);

            stat = document.createElement('h2');
            stat.className = "status-heading";
            stat.innerText = `${value.status}`;
            element.appendChild(stat);

            teamnames = document.createElement('div');
            teamnames.className = 'cricket-team-container';
            element2.appendChild(teamnames)

            subteamname1 = document.createElement('div');
            subteamname1.className = 'cricket-team1';
            teamnames.appendChild(subteamname1)

            team1 = document.createElement('h6');
            team1.className = "cricket-team-name";
            team1.innerText = `${value.t1}`;
            subteamname1.appendChild(team1);

            subteamname2 = document.createElement('div');
            subteamname2.className = 'cricket-team2';
            teamnames.appendChild(subteamname2)

            team2 = document.createElement('h6');
            team2.className = "cricket-team-name";
            team2.innerText = `${value.t2}`;
            subteamname2.appendChild(team2);

            scorebox = document.createElement('div');
            scorebox.className ="score";
            element.appendChild(scorebox);

            playscore1 = document.createElement('h2');
            playscore1.className = "score-team1";
            if(value.t1s == "") teaam1score = "No Data"
            else teaam1score = value.t1s;
            playscore1.innerText = `${teaam1score}`;
            scorebox.appendChild(playscore1);

            fightlogo = document.createElement('img');
            fightlogo.className ="vslogo";
            fightlogo.src = "https://i.pinimg.com/736x/1f/82/42/1f8242bf75096f25717a83ab5693a95c.jpg";
            scorebox.appendChild(fightlogo);
            
            playscore2 = document.createElement('h2');
            playscore2.className = "score-team2";
            if(value.t2s == "") teaam2score = "No Data"
            else teaam2score = value.t2s;
            playscore2.innerText = `${teaam2score}`;
            scorebox.appendChild(playscore2);
        });
    }
  
    };
    
xhr.send();
