const songImg=document.querySelector('img');
const songTitle=document.getElementById('title');

const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeSpan=document.getElementById('current-time');
const music =document.querySelector('audio');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

//songs array

const songs=[
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight, My Queen',
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
    },
];

//Check for play/pause btn
let playPause=false;

//play function
function playMusic(){
    playPause=true;
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
}

//pause function

function pauseMusic(){
    playPause=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

playBtn.addEventListener('click',()=>(playPause?pauseMusic():playMusic()));

//load song as per index

const loadSong=function(song){
    songTitle.textContent=song.displayName;
    songImg.src=`img/${song.name}.jpg`;
    music.src=`music/${song.name}.mp3`;
    pauseMusic();
    progress.style.width='0%';
    currentTimeSpan.textContent='0:00';
}

let currentSong=0;

loadSong(songs[currentSong]);

prevBtn.addEventListener('click',function(){
    currentSong--;
    if(currentSong<0){
        currentSong=songs.length-1;
    }

    loadSong(songs[currentSong]);
});

nextBtn.addEventListener('click',function(){
    currentSong++;
    if(currentSong>=songs.length){
        currentSong=0;
    }

    loadSong(songs[currentSong]);
});

const update=function(currentTime,duration){
    const currentWidth=(currentTime/duration)*100;
    console.log(currentWidth);

    currentMinute=Math.floor(currentTime/60);
    currentSecond=Math.trunc(currentTime%60);

    str=`${currentMinute}:${currentSecond}`;
    console.log( currentMinute, currentSecond,str);

    if(currentSecond>=10){
    currentTimeSpan.textContent=str;
    }
    else
    {
        currentSecond2='0'+currentSecond;
        currentTimeSpan.textContent=`${currentMinute}:${currentSecond2}`;
    }
    progress.style.width=`${currentWidth}%`;
}
updateProgress=function(e){
    ///console.log(e);
    if(playPause){
    const {duration,currentTime}=e.srcElement;
    //console.log(duration,currentTime);
    update(currentTime,duration);

    }
}

music.addEventListener('timeupdate',updateProgress);

setProgressBar=function(e){
    console.log(e);
    const screenWidth=this.clientWidth;
    console.log(screenWidth);

    const {offsetX}=e;
    console.log(offsetX);

    const {duration}=music;
    const currentTime=(offsetX/screenWidth)*duration;

    update(currentTime,duration);

    music.currentTime=currentTime;

}

progressContainer.addEventListener('click',setProgressBar);