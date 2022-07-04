<template>
  <div class="body">
    <template v-if="!error">
      <div class="num-box" v-show="showNum">{{ currPage }}/{{ numPages }}</div>
      <template v-for="i in numPages">
        <pdf class="pdf"
             :key="i"
             :src="src"
             :page="i"
             @page-loaded="pageLoaded($event)">
        </pdf>
      </template>
    </template>
    <template v-else>
      <el-result v-if="!url" icon="error" title="错误提示" subTitle="pdf url 不能为空">
      </el-result>
      <el-result v-else icon="error" title="错误提示" subTitle="pdf加载失败">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="load">重新加载</el-button>
        </template>
      </el-result>
    </template>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  name: "MobilePdf",
  components: {
    pdf
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // url: "http://192.168.0.158:8081/minio/files/openPreview?fileId=b4d81a4332d84ae486c9c5a5bbe00624",
      // url: "http://192.168.0.158:8081/minio/files/openPreview?fileId=529a17509468427fb62ae4bd1090a0ae",
      src: null,
      numPages: 0,
      currPage: 1,
      showNum: false,
      timer: null,
      loading: null,
      error: false
    }
  },
  created () {
    if (!this.url) {
      this.error = true
      this.$message.error("pdf url 不能为空")
    } else {
      this.load()
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  methods: {
    load () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.error = false
      this.src = pdf.createLoadingTask(this.url)
      this.src.promise.then(pdf => {
        this.numPages = pdf.numPages;
      }).catch(err => {
        this.closeLoading()
        this.$message.error('pdf加载失败')
        this.error = true
      })
    },
    pageLoaded (e) {
      if (e === this.numPages) {
        // 加载完成
        this.showNum = true
        this.closeLoading()
      }
    },
    closeLoading () {
      if (this.loading != null) {
        this.loading.close()
      }
    },
    handleScroll () {
      this.showNum = true
      if (this.timer != null) {
        clearTimeout(this.timer);//清除定時器
      }
      this.timer = setTimeout(() => {
        this.showNum = false
        this.timer = null
      }, 1000);
      this.calcCurrentScrollPage()
    },
    calcCurrentScrollPage () {
      // 页面滚动距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 一页pdf的高度
      let pdfHeight = document.getElementsByClassName('pdf').item(0).clientHeight + 15
      // 计算当前滚动到第几页
      this.currPage = Math.round(scrollTop / pdfHeight) + 1
    }
  }
}
</script>

<style scoped>

.body{
  padding: 15px;
  min-height: calc(100vh - 30px);
  display: flex;
  flex-direction: column;
  align-content: center;
}

.pdf {
  width: calc(100vw - 30px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.body > .pdf:not(:last-child) {
  margin-bottom: 15px;
}

.num-box {
  position: fixed;
  top: 25px;
  left: 25px;
  padding: 6px 20px;
  background-color: rgb(250, 250, 250);
  color: rgb(139, 139, 139);
  z-index: 1000;
  border-radius: 10px;
}

</style>
