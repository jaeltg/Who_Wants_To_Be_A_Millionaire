<template>
  <div>
       <ul v-for="(money, index) in moneyList.slice().reverse()" :key="index" id="money-list">
          <li v-if="potentialPrize === money" class="highlight">
              £{{money}}
              </li>
             <li v-else class="normal"> <p>£{{money}}</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'money-list',
    props: ['moneyList', 'potentialPrize']
}
</script>

<style scoped>
.highlight {
    background-color: orange;
}
</style>