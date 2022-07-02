<template>
  <div class="body">
    <el-image :src="src"></el-image>
  </div>
</template>

<script>
export default {
  name: "MobileImage",
  data () {
    return {
      src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ff4%2F6c%2F1c%2Ff46c1c4d5dbee45fade6a85de81edba9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659086365&t=313e13afead95e7ae68213cc140b6d83"
    }
  }
}
</script>

<style scoped>

.body {
  height: 100vh;
  width: 100vw;
  background-color: #0e0e0e;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

</style>
