<template>
  <LoadingView v-if="isLoading" />
  <div v-else class="mx-auto mb-5 col-11 col-md-10 col-lg-8">
    <div
      class="px-1 mb-2 d-flex justify-content-between align-items-center flex-wrap"
    >
      <h3 class="mb-0">常見問題</h3>
      <button
        @click="openQA_Modal(true)"
        class="btn btn-yellow-200"
        type="button"
      >
        新增
      </button>
    </div>

    <div class="accordion containerWrap" id="QAList">
      <div
        v-for="(item, index) in QA_List"
        :key="item.id"
        class="accordion-item border border-0"
      >
        <h2 class="accordion-header border border-0">
          <button
            :class="{ 'bg-secondary-subtle': item.isPublic === false }"
            class="accordion-button border-bottom rounded-0 py-0"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#QA_List${index}`"
            aria-expanded="true"
            :aria-controls="`QA_List${index}`"
          >
            <div class="d-flex flex-wrap align-items-center py-2">
              <div
                v-if="item.isPublic === false"
                class="d-inline text-danger border border-danger p-1 me-2"
              >
                未公開
              </div>
              <div class="py-2">Q{{ item.num }}. {{ item.title }}</div>
            </div>
          </button>
        </h2>
        <div
          :id="`QA_List${index}`"
          :class="{
            'bg-body-secondary text-secondary': item.isPublic === false,
          }"
          class="accordion-collapse collapse"
        >
          <div class="accordion-body border-bottom">
            <p class="overflow-x-auto mb-3">A : {{ item.description }}</p>
            <div class="col-12 text-end flex-wrap">
              <button
                @click="openQA_Modal(isNew, item)"
                class="btn btn-outline-primary me-2"
                type="button"
              >
                編輯
              </button>
              <button
                @click="openDelModal(item)"
                class="btn btn-outline-danger"
                type="button"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationView
      :pages="pagination"
      @emit-pages="getQAList"
    ></PaginationView>
  </div>
  <QA_Modal
    ref="QA_Modal"
    :QA="tempQA"
    @add-QA="addQA"
    @edit-QA="editQA"
  ></QA_Modal>
  <DelModal ref="delModal" :QA="tempQA" @del-QA="delQA"></DelModal>
</template>
<script>
import Collapse from "bootstrap/js/dist/collapse";
import QA_Modal from "@/components/backend/QA_Modal.vue";
import DelModal from "@/components/DelModal.vue";
import PaginationView from "@/components/PaginationView.vue";
export default {
  data() {
    return {
      QA_List: {},
      tempQA: {},
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  components: { QA_Modal, DelModal, PaginationView },
  methods: {
    getQAList(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.pagination = res.data.pagination;
          this.QA_List = res.data.articles;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openQA_Modal(isNew, QAItem) {
      this.$refs.QA_Modal.showModal();
      if (isNew) {
        this.tempQA = {};
      } else {
        this.tempQA = { ...QAItem };
      }
    },
    addQA(QA) {
      QA.create_at = (new Date() * 1000) / 1000;
      QA.content = QA.description;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      this.$http
        .post(api, { data: QA })
        .then((res) => {
          if (res.data.success) {
            this.$refs.QA_Modal.hideModal();
            this.$pushMsg.status200(res, "新增問答成功");
          } else {
            this.$pushMsg.status200(res, "新增問答失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.getQAList();
        });
    },
    editQA(QA) {
      QA.create_at = (new Date() * 1000) / 1000;
      QA.content = QA.description;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${QA.id}`;
      this.$http
        .put(api, { data: QA })
        .then((res) => {
          if (res.data.success) {
            this.$refs.QA_Modal.hideModal();
            this.$pushMsg.status200(res, "更新問答成功");
          } else {
            this.$pushMsg.status200(res, "更新問答失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.getQAList();
        });
    },
    openDelModal(delItem) {
      this.$refs.delModal.showModal();
      this.tempQA = { ...delItem };
    },
    delQA(QA) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${QA.id}`;
      this.$http
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.$refs.delModal.hideModal();
            this.$pushMsg.status200(res, "刪除問答成功");
          } else {
            this.$pushMsg.status200(res, "刪除問答失敗");
          }
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        })
        .finally(() => {
          this.getQAList();
        });
    },
  },
  created() {
    this.getQAList();
  },
  mounted() {
    const collapseElementList = document.querySelectorAll(".collapse");
    this.QA_List = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl)
    );
  },
};
</script>
<style lang="scss" scoped>
.containerWrap {
  min-height: 73vh;
}

.accordion-button:hover {
  color: #ccaf3c !important;
}

.accordion-button:not(.collapsed) {
  background-color: #f8f9fa;
  color: #000;
  font-weight: bolder;
}
</style>
