<template>
  <div>
       <ol reversed id="money-list">
          <li v-for="(money, index) in moneyList.slice().reverse()" :key="index" v-if="potentialPrize === money" class="highlight">
              <p>£{{money}}</p>
              </li>
             <li v-else class="normal"> <p class="money">£{{money}}</p>
          </li>
      </ol>
      
  </div>
</template>

<script>
export default {
    name: 'money-list',
    props: ['moneyList', 'potentialPrize']
}
</script>

<style scoped>
ol {
   font-family: Copperplate;
   margin-left: 20px;
   color: orange;
   font-size: 20px;
   font-weight: bold;
   
}
.money {
    font-family: Copperplate;
    font-size: 20px;
    text-align: left;
    margin-left: 10px;
}

li:nth-child(6) {
    color: whitesmoke
}
li:nth-child(1) {
    color: whitesmoke
}
li:nth-child(11) {
    color: whitesmoke
}

.highlight {
    background-color: orange;
    color: darkblue;
    font-family: Copperplate;
    font-size: 20px;
    text-align: left;
}
</style>