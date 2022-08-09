let container = document.querySelector(".container");
let image = document.querySelector("#image");
let audio = document.querySelector("#audio");
let title = document.querySelector("#music-detail .title");
let singer = document.querySelector("#music-detail .singer");
let play= document.querySelector("#control #play");
let pre = document.querySelector("#control #pre");
let next = document.querySelector("#control #next");
let currentTime = document.querySelector("#current-time");
let duration = document.querySelector("#duration");
let progressBar = document.querySelector("#progress-bar");
let volumeConteiner  = document.querySelector(".volume-conteiner")
let volume = document.querySelector("#volume")
let volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

let player = new MusicPlayer(musicList);


window.addEventListener("load",()=>{
    let music = player.getMusicList();
    displayMusicList(music);
    displayList(player.musicList)
    
})

const displayMusicList = (music) =>{
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.image;
    audio.src= "mp3/" + music.audio;
}

play.addEventListener("click", ()=>{
    const isPlay = container.classList.contains("playing");
    isPlay ? StopMusic() : PlayMusic()
})

const PlayMusic = ()=>{

    container.classList.add("playing");
    play.classList = "fa-regular fa-circle-pause";
    audio.play();

}

const StopMusic = ()=>{
    container.classList.remove("playing");
    play.classList = "fa-regular fa-circle-play";
    audio.pause();
}

pre.addEventListener("click", ()=>{
    let music = player.getMusicList();
    player.previous();
    displayMusicList(music);
    PlayMusic();
})

next.addEventListener("click", ()=>{
    let music = player.getMusicList();
    player.next();
    displayMusicList(music);
    PlayMusic();
})

const calculateTime = (totalTime)=>{
    let minute = Math.floor(totalTime/60);
    let second = Math.floor(totalTime % 60)
    let updateSecond = second<10 ? `0${second}` : `${second}`;
/*     console.log( `${minute}` + ":" + `${updateSecond}`) */
    return `${minute}` + ":" + `${updateSecond}`
}


audio.addEventListener("loadedmetadata",()=>{
/*     console.lof(audio.duration) */
   duration.textContent = calculateTime(audio.duration);
   progressBar.max = Math.floor(audio.duration);
   progressBar.step=1
})

audio.addEventListener("timeupdate",()=>{
/*     console.log(audio.currentTime) */
    progressBar.value= Math.floor(audio.currentTime);
    currentTime.textContent= calculateTime(progressBar.value)
})

progressBar.addEventListener("click",()=>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})


volume.addEventListener("click", ()=>{
    let isVolume= volumeConteiner.classList.contains("unmuted"); 
    isVolume ? Unmuted() : Muted()

})

const Muted = ()=>{
    volumeConteiner.classList.add("unmuted");
    volume.classList = "fa-solid fa-volume-xmark"
    audio.muted = true
}

const Unmuted=()=>{
    volumeConteiner.classList.remove("unmuted");
    volume.classList = "fa-solid fa-volume-high";
    audio.muted = false
}

volumeBar.addEventListener("input", (e)=>{
    let value = e.target.value;
/*     console.log(value) */
    audio.value = value/100; 
/*     console.log(audio.value) // 0-1 */

    if(audio.value == 0){
        audio.muted = true;
        volume.classList = "fa-solid fa-volume-xmark"
    }
    else{
        audio.muted = false;
        volume.classList = "fa-solid fa-volume-high"
    }

})




function displayList(list){
    for(let i=0; i<list.length; i++){
        let liTag =`
         <li li-index='${i}'  onclick = "selecMusic(this)"  class="list-group-item d-flex justify-content-between align-items-center">
        <span>${list[i].getName()}</span>
        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
        <audio class="music-${i}" src="mp3/${list[i].audio}">
    </li>`;
    ul.insertAdjacentHTML("beforeend",liTag)
    let audioDuration = ul.querySelector(`#music-${i}`)

    let audioTag = ul.querySelector(`.music-${i}`);

    audioTag.addEventListener("loadeddata",()=>{
        audioDuration.innerText= calculateTime(audioTag.duration)
    })
  
    
    }
   
}

const selecMusic = (li) =>{
    /* console.log(select) */
    player.index  = li.getAttribute("li-index")
   displayMusicList(player.getMusicList())
   PlayMusic()

}