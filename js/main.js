


var app = new Vue({

    el: "#app",
    data() {
        return {
            listado_playlist: [],
            listado_user: {},
            listado_cancion: [],
            listado_seleccionado: { artist: { picture_xl: null, name: null }, album: { title: null }, posicion: null },
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
            if (this.listado_seleccionado.posicion < this.listado_playlist.length - 1) {
                this.listado_seleccionado = JSON.parse(JSON.stringify(this.listado_playlist[valor.posicion + 1]));
                this.listado_seleccionado.posicion = valor.posicion + 1
                console.log(this.listado_seleccionado.posicion)
                this.Cancion(this.listado_seleccionado, this.listado_seleccionado.posicion);
            }

        },
        ReproducirAnterior(valor) {
            if (this.listado_seleccionado.posicion > 0) {
                this.listado_seleccionado = JSON.parse(JSON.stringify(this.listado_playlist[valor.posicion - 1]));
                this.listado_seleccionado.posicion = valor.posicion - 1
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
        Cancion(value, index) {
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
            fetchJsonp('https://api.deezer.com/user/5025778122?output=jsonp')
            .then(function(response) {
                return response.json();
              })
                .then(response => {
                   
                    this.listado_user = response})
            
                



        },

        getPlaylist: function (item) {
            if (item == "") {
                this.getReciente();
            } else {
                fetchJsonp('https://api.deezer.com/search?q=' + item +'&output=jsonp')
                .then(function(response) {
                    return response.json();
                  })
                    .then(response => {
                        this.listado_playlist = response.data
                        this.listado_seleccionado = response.data[0];
                    })


            }

        },


        getReciente: function () {
            fetchJsonp('https://api.deezer.com/user/5025778122/flow&output=jsonp')
            .then(function(response) {
                return response.json();
              })
              .then(response => {
              
                        this.listado_playlist = response.data;
                        this.listado_seleccionado = response.data[0];
    
                    })
              .catch(function(error) { console.log(error); });

        },



    },
});
