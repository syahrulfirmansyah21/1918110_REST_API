const ApiKey = "a02b273c6e364b1f80ef3cd8a6acc918";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Premier Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                       <a href="#" data-id="${team.id}"class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
                       </li>
                       `
                   });
                   contents.innerHTML = '<ul class="collection">' + teams + '</ul>'
                   const detil = document.querySelectorAll('.secondary-content');
                   detil.forEach(btn=>{
                       btn.onclick=(event)=>{
                           ShowTeaminfo (event.target.dataset.id);
                       }
                   })
               }).catch(err => {
                   console.error(err);
               })
       }
       function ShowTeaminfo (id){
           let teamdetail =baseUrl+"teams/"+id;
           fetch(teamdetail,fetchHeader)
           .then(response => response.json())
           .then(resJson => {
               let name =(resJson.name);
               let crestUrl =(resJson.crestUrl);
               let shortName = (resJson.shortName);
               let founded = (resJson.founded);
               let clubColors =(resJson.clubColors);
               let address =(resJson.address);
               let venue =(resJson.venue);
               let website =(resJson.website);
               console.log (resJson.squad);
               let squad ="";
       
               resJson.squad.forEach(skuad=>{
                   squad+=`
                   <tr>
                   <td>${skuad.name}</td>
                   <td>${skuad.position}</td>
                   <td>${skuad.nationality}</td> 
                   </tr>`
               });
            title.innerHTML ="Detail Tim "+name;
           contents.innerHTML=`
           <div class="card">
           <table class="highlights responsive-table">
           <tr>
               <td rowspan="7" width=20px>
                    <img src="${crestUrl}"width=200px>
               </td>
            </tr>
            <tr>
               <td>Nama</td>
               <td>:</td>
               <td>${shortName}</td>
            </tr>
            <tr>
               <td>Berdiri</td>
               <td>:</td>
               <td>${founded}</td>
            </tr>
            <tr>
               <td>Jersey</td>
               <td>:</td>
               <td>${clubColors}</td>
            </tr>
            <tr>
               <td>Alamat</td>
               <td>:</td>
               <td>${address}</td>
            </tr>
            <tr>
               <td>Venue</td>
               <td>:</td>
               <td>${venue}</td>
            </tr>
            <tr>
            <td>Website</td>
            <td>:</td>
            <td>${website}</td>
             </tr>
            <tr>
            </table>
            </div>
            <div class="card">
            <table class="stripped responsive-table">
                <thead>
                    <th>Nama</th>
                    <th>Posisi</th>
                    <th>Kewarganegaraan</th>
                </thead>
                <tbody>
                    ${squad}
                </tbody>
            </table>
        </div>
           `;
       })
       }

function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Premier Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Premier Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});