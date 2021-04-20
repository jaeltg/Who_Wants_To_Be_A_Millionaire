<template>
  <div>
      You took your money! You leave with £{{ takeawayPrize }}
  </div>
</template>

<script>
export default {
    name: "take-money",
    props: ["takeawayPrize"]

}
</script>

<style>

</style>