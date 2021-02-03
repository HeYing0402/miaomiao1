<template>
        <div class="city_body">
            <div class="city_list">
              <Loading v-if="isLoading"/>
                  <div class="city_hot">
                      <h2>热门城市</h2>
                      <ul class="clearfix">
                          <li v-for="item in hotList" :key="item.id" @click="handleToCity(item.nm, item.id)">{{item.nm}}</li>
                      </ul>
                  </div>
                  <div class="city_sort" ref="city_sort">
                      <div v-for="item in cityList" :key="item.index">
                        <h2>{{item.index}}</h2>
                        <ul>
                          <li v-for="itemList in item.list" :key="itemList.id" @click="handleToCity(itemList.nm, itemList.id)">{{itemList.nm}}</li>
                        </ul>
                      </div>
                  </div>
            </div>
            <div class="city_index">
                <ul>
                    <li v-for="(item, index) in cityList" :key="item.index" @touchstart="handelToIndex(index)">{{item.index}}</li>
                </ul>
            </div>
        </div>
</template>
<script>
export default {
  name: 'city',
  data () {
    return {
      cityList: [],
      hotList: [],
      isLoading: true
    }
  },
  mounted () {
    var cityList = window.localStorage.getItem('cityList')
    var hotList = window.localStorage.getItem('hotList')
    if (cityList && hotList) {
      this.isLoading = false
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
    } else {
      this.axios.get('/cities.json').then(res => {
        this.isLoading = false
        var cities1 = res.data.letterMap.A
        var cities2 = res.data.letterMap.B
        var cities3 = res.data.letterMap.C
        var cities4 = res.data.letterMap.D
        var cities5 = res.data.letterMap.E
        var cities6 = res.data.letterMap.F
        var cities7 = res.data.letterMap.G
        var cities8 = res.data.letterMap.H
        var cities9 = res.data.letterMap.J
        var cities10 = res.data.letterMap.K
        var cities11 = res.data.letterMap.L
        var cities12 = res.data.letterMap.M
        var cities13 = res.data.letterMap.N
        var cities14 = res.data.letterMap.P
        var cities15 = res.data.letterMap.Q
        var cities16 = res.data.letterMap.R
        var cities17 = res.data.letterMap.S
        var cities18 = res.data.letterMap.T
        var cities19 = res.data.letterMap.W
        var cities20 = res.data.letterMap.X
        var cities21 = res.data.letterMap.Y
        var cities22 = res.data.letterMap.Z
        var cities = cities1.concat(cities2).concat(cities3).concat(cities4).concat(cities5).concat(cities6).concat(cities7).concat(cities8).concat(cities9).concat(cities10).concat(cities11).concat(cities12).concat(cities13).concat(cities14).concat(cities15).concat(cities16).concat(cities17).concat(cities18).concat(cities19).concat(cities20).concat(cities21).concat(cities22)
        var { cityList, hotList } = this.formatCityList(cities)
        this.cityList = cityList
        this.hotList = hotList
        window.localStorage.setItem('cityList', JSON.stringify(cityList))
        window.localStorage.setItem('hotList', JSON.stringify(hotList))
      })
    }
  },
  methods: {
    formatCityList (cities) {
      var cityList = []
      var hotList = []
      for (var k = 0; k < cities.length; k++) {
        if (cities[k].rank === 'S') {
          hotList.push(cities[k])
        }
        if (cities[k].rank === 'A') {
          hotList.push(cities[k])
        }
      }
      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase()
        if (toCom(firstLetter)) {
          cityList.push({ index: firstLetter, list: [{ nm: cities[i].nm, id: cities[i].id }] })
        } else {
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id })
            }
          }
        }
      }
      function toCom (firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false
          }
        }
        return true
      }
      return {
        cityList,
        hotList
      }
    },
    handelToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
      // this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
    },
    handleToCity (nm, id) {
      this.$store.commit('city/CITY_INFO', { nm, id })
      window.localStorage.setItem('nowNm', nm)
      window.localStorage.setItem('nowId', id)
      this.$router.push('/movie')
    }
  }
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
