class Music{
    constructor(title,singer,image,audio){
        this.title=title,
        this.singer = singer,
        this.image = image,
        this.audio = audio
    }

    getName(){
        return this.title + "-" + this.singer
    }
}

const musicList = [
    new Music("Enemy","Imagine Dragons","1.jpg","1.mp3"),
    new Music("Another Love","Tom Odell", "2.jpg","2.mp3"),
    new Music("Sykfall", "Adele","3.jpg","3.mp3"),
    new Music("Where is my love", "SYML","4.jpg","4.mp3")
];