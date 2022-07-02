<template>
  <div class="page">
    <el-container>
      <el-header>
        <div></div>
        <div></div>
      </el-header>
      <el-container>
        <el-aside width="300px">

        </el-aside>
        <el-main id="main">
          <template v-for="i in numPages">
            <pdf ref="pdf"
                 :style="{width: pdfWidth + 'px', marginBottom: i < numPages ? '20px' : '0px'}"
                 class="pdf"
                 :key="i"
                 :src="src"
                 :page="i"
                 @page-loaded="pageLoaded($event)">
            </pdf>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  name: "PcPdf",
  components: {
    pdf
  },
  data () {
    return {
      src: null,
      numPages: 0,
      pdfWidth: 0
    }
  },
  created () {
    this.src = pdf.createLoadingTask("../../img/2.pdf")
  },
  mounted () {
    this.calcWidth()
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  },
  methods: {
    calcWidth () {
      const width = document.getElementById("main").clientWidth
      this.pdfWidth = width * 0.6
    },
    pageLoaded (e) {
      if (e === this.numPages) {
        // 加载完成
      }
    }
  }
}
</script>

<style scoped>

.page {
  color: white;
}

.el-header {
  background-color: rgb(50, 54, 57);
  padding: 18px;
  width: 100vw;
  height: 44px;
  display: flex;
  align-items: center;
}

.el-aside, .el-main {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-aside {
  background-color: rgb(50, 54, 57);
}

.el-main {
  background-color: rgb(82, 86, 89);
}

.pdf {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

</style>
