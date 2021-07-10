<template>
    <q-page padding>
      <div class="q-mb-xl ">
          <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      autoplay
      swipeable
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="https://samfillingham.com/wp-content/uploads/2020/05/2200-1000px-banner-Muna-1310x595.jpg" />
      <q-carousel-slide :name="5" img-src="https://collider.com/wp-content/uploads/inception_movie_poster_banner_04.jpg" />
      <q-carousel-slide :name="2" img-src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/94ab2ad3-e0d4-4764-85ad-873af742bd4a/dbtvttv-1b58313c-e904-4f29-8df6-fdbc85dfb328.png/v1/fill/w_1600,h_903,q_80,strp/justice_league_crisis_on_two_earths_movie_banner_by_arkhamnatic_dbtvttv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk0YWIyYWQzLWUwZDQtNDc2NC04NWFkLTg3M2FmNzQyYmQ0YVwvZGJ0dnR0di0xYjU4MzEzYy1lOTA0LTRmMjktOGRmNi1mZGJjODVkZmIzMjgucG5nIiwiaGVpZ2h0IjoiPD05MDMiLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC85NGFiMmFkMy1lMGQ0LTQ3NjQtODVhZC04NzNhZjc0MmJkNGFcL2Fya2hhbW5hdGljLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.cwd_LMcDDQsWZl3116R5oI-QN6ZRWiwbquXXY5G4aoQ" />
      <q-carousel-slide :name="3" img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZq4gF4VvZec-GaQSjH9TVZpR4FemLELER5uy1QWC8K7bhToJcKLUMORi2tqyu8BWollM&usqp=CAU" />
      <q-carousel-slide :name="4" img-src="https://i.pinimg.com/736x/25/8b/d9/258bd96b67684bce6912ee879d3063f7.jpg " />
    </q-carousel>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-md-3 col-xs-12" v-for="(movie, i) in data" :key="i">
              <q-card>
                   <q-img
                    :src="`${$baseImageURL}/${movie.image}`"
                    :ratio = "16/9"
                    />

                    <q-card-section>
                        <q-btn
                        fab
                        color="warning"
                        icon="add_shopping_cart"
                        class="absolute"
                        unelevated
                        style="top: 0; right: 12px; transform: translateY(-50%);"
                        />

                        <div class="row no-wrap items-center">
                        <div class="col text-h6 ellipsis">
                            {{ movie.judulFilm }}
                        </div>
                        </div>

                        <q-rating v-model="movie.rating" readonly color="orange-5" :max="5" size="32px" />
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <div class="text-subtitle1">
                         Rp.{{ movie.harga }},-
                        </div>
                        <div class="text-subtitle1">
                        {{ movie.id }}
                        </div>
                        <div @click="movie.expanded = !movie.expanded" class="text-caption text-grey cursor-pointer">
                          Tampilkan Deskripsi
                        </div>
                        <q-slide-transition>
                        <div v-show="movie.expanded">
                          <div class="text-grey text-caption">
                            {{ movie.deskripsi }}
                          </div>
                        </div>
                      </q-slide-transition>
                    </q-card-section>

                    <q-card-actions>
                        <q-btn unelevated @click="openDetail(movie)" class="full-width" color="primary">
                        Order Now
                        </q-btn>
                    </q-card-actions>
                    </q-card>
        </div>
      </div>
              <q-dialog v-model="dialog" v-if="dialog" position="bottom">
              <q-card style="width: 500px">
                <q-card-section>
                  <div class="text-h6">Detail Pemesanan</div>
                </q-card-section>
                <q-card-section style="max-height: 50vh;" class="scroll">
                  {{ activeData.judulFilm }} - Rp.{{ activeData.harga }},-
                  <q-form class="q-mt-md">
                    <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Masukan Jumlah"/>
                    Total : Rp.{{total}},-
                    <q-file color="teal" class="q-mt-md" filled v-model="image" label="Label">
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" />
                    </template>
                  </q-file>
                  </q-form>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Batal"/>
                  <q-btn color="primary" @click="prosesTransaksi()" label="Proses"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 4,
      dialog: false,
      image: null,
      activeData: null,
      jumlah: 1,
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idFilm: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
