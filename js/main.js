
//import {apis} from "../api/api";

// Vue.component("busqueda-cancion", {
//     props: ["value"],
//     data() {
//         return {
//             listado_playlist: [],
//             listado_seleccionado: { artist: { picture_xl: null, name: null }, album: { title: null } },
//         }
//     },
//     created() {
//         this.getRecientse();
//     },
//     methods: {
//         getRecientse() {
//             axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
//             axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

//             axios.get('https://api.deezer.com/user/5025778122/flow')
//                 .then(response => {
//                     this.listado_playlist = response.data.data;
//                     this.listado_seleccionado = response.data.data[0];

//                 })

//         },
//     },


//     template:


//         `
//             <div class="imgcard-resultado">
//             <img :src="value.artist.picture_xl" alt="">
//             </div>
//         <div class="textcard-resultado">
//             <span class="textcancion-card">{{ value.title }}</span> <br>
//             <span class="textartista-card">{{ value.artist.name }}</span>
//         </div>
//         `
// });


var app = new Vue({

    el: "#app",
    data() {
        return {
            listado_playlist: [],
            listado_user: [],
            listado_cancion: [],
            listado_seleccionado: { artist: { picture_xl: null, name: null }, album: { title: null }, posicion:null},
            text: '',
            play: true,
            audio: null,
            
        }

    },
    created() {
        this.getReciente();

    }, computed: {

    },
    mounted() {
        this.getUser();
    },
    methods: {

        volumen(value) {

            var newvalue = (value / 100);
            this.audio.volume = newvalue;
            
        },
        ReproducirSiguiente(valor) {
          if(this.listado_seleccionado.posicion < this.listado_playlist.length-1){
            this.listado_seleccionado  = JSON.parse(JSON.stringify( this.listado_playlist[valor.posicion+1]));
            this.listado_seleccionado.posicion = valor.posicion+1
            console.log(this.listado_seleccionado.posicion)
            this.Cancion(this.listado_seleccionado, this.listado_seleccionado.posicion);
          }
           
        },
        ReproducirAnterior(valor) {
            if(this.listado_seleccionado.posicion >0){
              this.listado_seleccionado  = JSON.parse(JSON.stringify( this.listado_playlist[valor.posicion-1]));
              this.listado_seleccionado.posicion = valor.posicion-1
              console.log(this.listado_seleccionado.posicion)
              this.Cancion(this.listado_seleccionado, this.listado_seleccionado.posicion);
            }
             
          },
        Reproducir(item) {
            if (item.length > 0) {
                this.audio = new Audio(item)
                const banner = document.getElementById("reproductor");
                banner.classList.remove("nonerepro");
                this.playSound();
                this.play = false;
            }


        },
        Cancion(value,index) {
            if (this.audio) {
                this.audio.pause();
            } else {
                this.listado_seleccionado = value;
                var item = this.listado_seleccionado.preview;
                this.listado_seleccionado.posicion = index;
                this.Reproducir(item);
            }

            if (this.audio.paused) {
                this.listado_seleccionado = value;
                var item = this.listado_seleccionado.preview;
                this.listado_seleccionado.posicion = index;
                this.Reproducir(item);
            }

        },
        playSound() {
            this.audio.play();
        },
        pauseSound() {
            this.audio.pause();
        },


        getUser: function () {
            axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            //  const url = apis.apiUser
            axios.get('https://api.deezer.com/user/5025778122')
                .then(response => (this.listado_user = response))
   


        },

        getPlaylist: function (item) {
            if (item == "") {
                this.getReciente();
            } else {
                axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
                axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                //  const url = apis.apiUser
                axios.get('https://api.deezer.com/search?q=' + item)
                    .then(response => {
                        this.listado_playlist = response.data.data
                        this.listado_seleccionado = response.data.data[0];
                    })

          
            }

        },


        getReciente: function () {
            axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            //  const url = apis.apiUser
            axios.get('https://api.deezer.com/user/5025778122/flow')
                .then(response => {
                    this.listado_playlist = response.data.data;
                    this.listado_seleccionado = response.data.data[0];

                })

        },



    },
});
