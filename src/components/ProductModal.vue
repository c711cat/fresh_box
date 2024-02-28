<template>
  <div ref="productModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <div class="col-lg-4 row g-3 mx-0 flex-column">
              <div class="col-12">
                <label for="inputUrl" class="form-label">
                  輸入封面圖片網址
                </label>
                <div class="input-group">
                  <input
                    v-model="tempProduct.imageUrl"
                    type="url"
                    class="form-control"
                    id="inputUrl"
                    placeholder="請輸入連結"
                  />
                  <button
                    @click="delCoverImg"
                    type="button"
                    class="btn btn-outline-danger"
                  >
                    移除
                  </button>
                </div>
              </div>
              <div class="col-12">
                <label for="customFile" class="form-label"
                  >或 上傳封面圖片檔案
                </label>
                <input
                  @change="uploadFile"
                  ref="fileInput"
                  type="file"
                  id="customFile"
                  class="form-control mb-3"
                />
                <div class="col-12">
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
                </div>
              </div>

              <div v-if="tempProduct.images" class="col-12">
                <div
                  v-for="(image, index) in tempProduct.images"
                  :key="index"
                  class="border-top pt-2"
                >
                  <label for="inputUrl" class="form-label">
                    輸入其他圖片網址
                  </label>
                  <div class="input-group mb-3">
                    <input
                      v-model="tempProduct.images[index]"
                      type="url"
                      class="form-control"
                      id="inputUrl"
                      placeholder="請輸入連結"
                    />
                    <button
                      @click="delImg(index)"
                      type="button"
                      class="btn btn-outline-danger"
                    >
                      移除
                    </button>
                  </div>
                  <div class="col-12">
                    <label for="customFile" class="form-label"
                      >或 上傳其他圖片檔案
                    </label>
                    <input
                      @change="uploadMultipleImgs"
                      :ref="index"
                      type="file"
                      id="customFile"
                      class="form-control mb-3"
                    />
                    <img
                      class="img-fluid mb-3"
                      :src="tempProduct.images[index]"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <button
                  @click="addImg"
                  class="btn btn-outline-primary btn-sm w-100"
                >
                  新增其他圖片
                </button>
              </div>
            </div>

            <div class="rightContainer col-lg-8 row g-3 mx-0">
              <div class="col-lg-6">
                <label for="name" class="form-label">產品名稱</label>
                <input
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  id="name"
                />
              </div>
              <div class="col-lg-6">
                <label for="category" class="form-label">類別</label>
                <input
                  v-model="tempProduct.category"
                  type="text"
                  class="form-control"
                  id="category"
                  placeholder="例如：水果類"
                />
              </div>
              <div class="col-lg-4">
                <label for="unit_description" class="form-label">說明</label>
                <input
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  id="unit_description"
                  placeholder="例如：600g±5%"
                />
              </div>
              <div class="col-lg-4">
                <label for="number" class="form-label">數量</label>
                <input
                  v-model="tempProduct.num"
                  min="0"
                  type="number"
                  class="form-control"
                  id="number"
                  placeholder="例如：10"
                />
              </div>
              <div class="col-lg-4">
                <label for="unit" class="form-label">單位</label>
                <input
                  v-model="tempProduct.unit"
                  type="text"
                  class="form-control"
                  id="unit"
                  placeholder="例如：份"
                />
              </div>
              <div class="col-lg-6">
                <label for="origin_price" class="form-label">原價</label>
                <input
                  v-model.number="tempProduct.origin_price"
                  type="text"
                  class="form-control"
                  id="origin_price"
                  placeholder="例如：300"
                />
              </div>
              <div class="col-lg-6">
                <label for="price" class="form-label">售價</label>
                <input
                  v-model.number="tempProduct.price"
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="例如：250"
                />
              </div>
              <div class="col-lg-12">
                <label for="detailed_description" class="form-label">
                  產品介紹
                </label>
                <textarea
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  id="detailed_description"
                >
                </textarea>
              </div>
              <div class="col-lg-12 form-check mx-1">
                <input
                  v-model="tempProduct.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck"> 販售 </label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            @click="$emit('update-product', tempProduct)"
            type="button"
            class="btn btn-primary"
          >
            新增產品
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    uploadFile() {
      const uploadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploadFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((res) => {
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl;
        }
      });
    },
    uploadMultipleImgs() {
      const imgOfIndex = this.tempProduct.images.length - 1;
      const multipleFile = this.$refs[imgOfIndex][0].files[0];
      const formData = new FormData();
      formData.append("file-to-upload", multipleFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((res) => {
        if (res.data.success) {
          this.tempProduct.images[imgOfIndex] = res.data.imageUrl;
        }
      });
    },
    delCoverImg() {
      this.tempProduct.imageUrl = "";
      this.$refs.fileInput.value = "";
    },
    delImg(index) {
      this.tempProduct.images.splice(index, 1);
    },
    addImg() {
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
      this.tempProduct.images.push("");
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal);
    this.showModal();
  },
};
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid black;
}

.rightContainer {
  height: fit-content;
}
</style>
