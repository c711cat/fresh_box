<template>
  <div
    ref="Modal"
    class="modal fade"
    id="admin's_QA_Modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <header class="modal-header ps-4">
          <h5 class="mb-0">{{ headerText }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </header>
        <section class="modal-body ms-3">
          <form class="row m-0 g-3">
            <div class="">
              <div class="d-inline text-danger">＊</div>
              <label class="form-label" for="author">發布者</label>
              <input
                v-model="tempQA.author"
                class="form-control"
                type="text"
                name="author"
                id="author"
                placeholder="例如：BOSS"
              />
            </div>
            <div>
              <div class="d-inline text-danger">＊</div>
              <label class="form-label" for="question_title">問題標題</label>
              <input
                v-model="tempQA.title"
                class="form-control"
                type="text"
                name="question_title"
                id="question_title"
                placeholder="例如：運費計算"
              />
            </div>
            <div>
              <div class="d-inline text-danger">＊</div>
              <label class="form-label" for="answer">問題解答</label>
              <textarea
                v-model="tempQA.description"
                type="text"
                class="form-control"
                id="answer"
              >
              </textarea>
            </div>
            <div class="col-6 form-check">
              <label class="form-check-label" for="isPublic"> 公開此問答</label>
              <input
                v-model="tempQA.isPublic"
                class="form-check-input"
                type="checkbox"
                :true-value="true"
                :false-value="false"
                id="isPublic"
              />
            </div>
          </form>
        </section>
        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="QA.id"
            @click="$emit('edit-QA', tempQA)"
            type="button"
            class="btn btn-primary"
          >
            更新問答
          </button>
          <button
            v-else
            @click="$emit('add-QA', tempQA)"
            type="button"
            class="btn btn-yellow-200"
          >
            新增問答
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from "@/mixins/modalMixin";
export default {
  data() {
    return {
      modal: {},
      tempQA: {},
    };
  },
  mixins: [ModalMixin],
  props: {
    QA: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    QA() {
      this.tempQA = this.QA;
      if (!this.QA.id) {
        this.tempQA.isPublic = false;
      }
    },
  },
  computed: {
    headerText() {
      if (this.QA.id) {
        return "更新問答";
      } else {
        return "新增問答";
      }
    },
  },
};
</script>
