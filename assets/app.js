const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const player = $('.player')
const cd = $('.cd')
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const progRess = $("#progress")
const playBtn = $('.btn-toggle-play')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn =$('.btn-repeat')

const app = {
    isRandom: false,
    currentIndex : 0, 

    isRepeat :  false,

     Songs : [

        {
          name: 'SOFAR',
          singer: 'BINZ DA POET',
          path: './assets/music/SOFAR.mp3',
          image: './assets/img/SOFAR.jpg',
          
        },
    
        {
            name: 'Chơi Vơi (feat. Orange)',
            singer: 'Táo',
             path: './assets/music/ChoiVoi.mp3',
            image: './assets/img/TAO.jpg',
        },
    
    
        {
            name: 'Afterthounght',
            singer: 'Joji & BENEE',
            path: './assets/music/Afterthought.mp3',
            image: './assets/img/joji.jpg',
            
        },
    
        {
            name: 'CHÚNG TA CỦA HIỆN TẠI',
            singer: 'Sơn Tùng',
            path: './assets/music/ChungTaCuaHienTai.mp3',
            image: './assets/img/SonTung.jpg',
            
        },

        {
            name: 'CDG PLAY (feat. Eren )',
            singer: 'VCC Left Hand ',
            path: './assets/music/CDGPLAY.mp3',
            image: './assets/img/leftHand.jpg',
        }
    ],

      defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
          get: function () {
            return this.Songs[this.currentIndex];
          }
        });
      },

      loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

      },

    handleEvents: function () {
          // IMG rotate when playing song
        let cdThumbAnimate =  cdThumb.animate([
          { transform: ' rotate(160deg) ' }
          
        ], {
          duration: 10000,
          iterations : Infinity 
        })

        cdThumbAnimate.pause()

            // IMG song zoom and ... when scroll window
            const cdWidth = cd.offsetWidth;
            document.onscroll = function () {
              const scrollTop = window.scrollY || document.documentElement.scrollTop;
              const newCdWidth = cdWidth - scrollTop;
        
              cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
              cd.style.opacity = newCdWidth / cdWidth;
            };

            // Play & Pause song
            let isPause = false
            let isPlaying = true

            playBtn.addEventListener('click', () => {
              if (isPlaying){
                audio.play()
                isPlaying = false
                player.classList.add('playing')
                cdThumbAnimate.play()
              }  else {
                audio.pause()
                isPlaying = true
                player.classList.remove('playing')
                cdThumbAnimate.pause()
              }
          })
       
          // Run song 
          audio.ontimeupdate = function (){
            if (audio.duration){
              const progRessPercent = Math.floor( audio.currentTime / audio.duration * 100 )
              progRess.value = progRessPercent
            }
          }

          // Seek time  song
          progRess.onchange = function(e){
            const seekTime =   audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
          }

          // button next song
          const _this = this
          nextBtn.addEventListener('click', function (){
            player.classList.add('playing')
            _this.nextSong()
            audio.play()
          })

          // button prev song
          prevBtn.addEventListener('click', function (){
            player.classList.add('playing')
            _this.prevSong()
            audio.play()
          })
        
        randomBtn.onclick = function (e){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',  _this.isRandom )
        }

        repeatBtn.onclick = function (e){
          _this.isRepeat = !_this.isRepeat
          repeatBtn.classList.toggle('active',  _this.isRepeat )
        }

        audio.onended = function (){
          if (_this.isRepeat){
            audio.play()
          } else{
            nextBtn.click()
          }

         nextBtn.click()
        }

      },

    playRandom: function (){
        let newIndex 
        do{
          newIndex = Math.floor(Math.random() * this.Songs.length )
        } while ( newIndex === this.currentIndex )
        
    },


      // Next song
      nextSong: function(){

        this.currentIndex++

        if(this.currentIndex >= this.Songs.length  ){
          this.currentIndex = 0
        }

        this.loadCurrentSong()
      },

      // Prev song
      prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0  ){
          this.currentIndex = this.Songs.length - 1 
        }
        this.loadCurrentSong()
      },


      
      render: function(){
          const htmls = this.Songs.map(song => {
              return `<div class="song">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name} </h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                        </div> `
                    })

             $('.playlist').innerHTML = htmls.join('')
      },

      start: function () { 

        this.render()

        this.defineProperties();
        
        this.handleEvents()

        this.loadCurrentSong();

      }

    }

app.start()


