class MusicPlayer{
    constructor(musicList){
        this.musicList=musicList,
        this.index= 0;
    }

    getMusicList(){
        return this.musicList[this.index];
    }
     
    next(){ // index in bir fazlası uzunluğuna eşit değilse
        if( this.index+1 != this.musicList.length){
            this.index++;
        }
        else{
            this.index=0;
        }
    }
    previous(){
        if(this.index != 0){
            this.index--;
        }
        else{
            this.index= this.musicList.length - 1;
        }
    }
}