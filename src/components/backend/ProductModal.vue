<template>
  <div
    ref="Modal"
    class="modal fade"
    id="admin'sProductModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <header class="modal-header">
          <h5 v-if="tempProduct.id" class="modal-title">編輯產品</h5>
          <h5 v-else class="modal-title">新增產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </header>
        <main class="modal-body">
          <form class="row g-3">
            <div class="col-lg-4 row g-3 mx-0 flex-column">
              <section class="col-12">
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
              </section>
              <section class="col-12">
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
                <div class="col-12 mb-1">
                  <img
                    class="img-fluid"
                    :srcset="`${tempProduct.imageUrl}&w=500`"
                    alt=""
                  />
                </div>
              </section>
              <section v-if="tempProduct.images" class="col-12">
                <div
                  v-for="(image, index) in tempProduct.images"
                  :key="image + index"
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
                      :src="`${tempProduct.images[index]}&w=500`"
                      alt=""
                    />
                  </div>
                </div>
              </section>
              <div class="mt-2">
                <button
                  @click="addImg"
                  class="btn btn-outline-dark-primary btn-sm w-100"
                  type="button"
                >
                  新增其他圖片
                </button>
              </div>
            </div>
            <section class="rightContainer col-lg-8 row g-3 mx-0">
              <div class="col-lg-6 col-xl-4">
                <div class="d-inline text-danger">＊</div>
                <label for="name" class="form-label">產品名稱</label>
                <input
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  id="name"
                />
              </div>
              <div class="col-lg-6 col-xl-3">
                <div class="d-inline text-danger">＊</div>
                <label for="category" class="form-label">類別</label>
                <v-select
                  v-model="tempProduct.category"
                  label="Select"
                  :options="options"
                ></v-select>
              </div>
              <div class="col-xl-5">
                <div class="d-inline text-danger">＊</div>
                <label for="category" class="form-label">保存方式</label>
                <v-select
                  v-model="tempProduct.preservation_methods"
                  label="Select"
                  :options="preservationMethods"
                ></v-select>
              </div>
              <div class="col-lg-6 col-xl-3">
                <label for="unit_description" class="form-label">產地</label>
                <input
                  v-model="tempProduct.origin_place"
                  type="text"
                  class="form-control"
                  id="unit_description"
                  placeholder="例如：台灣"
                />
              </div>
              <div class="col-lg-6 col-xl-4">
                <label for="unit_description" class="form-label"
                  >重量規格</label
                >
                <input
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  id="unit_description"
                  placeholder="例如：600g±5%"
                />
              </div>
              <div class="col-lg-6 col-xl-2">
                <div class="d-inline text-danger">＊</div>
                <label for="unit" class="form-label">單位</label>
                <input
                  v-model="tempProduct.unit"
                  type="text"
                  class="form-control"
                  id="unit"
                  placeholder="例如：份"
                />
              </div>
              <div class="col-lg-6 col-xl-3">
                <label for="number" class="form-label">數量</label>
                <input
                  v-model="tempProduct.qty"
                  min="0"
                  type="number"
                  class="form-control"
                  id="number"
                  placeholder="例如：10"
                />
              </div>

              <div class="col-lg-6">
                <div class="d-inline text-danger">＊</div>
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
                <div class="d-inline text-danger">＊</div>
                <label for="price" class="form-label">售價</label>
                <input
                  v-model.number="tempProduct.price"
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="例如：250"
                />
              </div>

              <div class="col-lg-12 mb-3">
                <div
                  v-for="(item, index) in tempProduct.description"
                  :key="index"
                  class="mb-2"
                >
                  <label for="detailed_description" class="form-label">
                    產品介紹 {{ index + 1 }}
                  </label>
                  <div class="input-group">
                    <textarea
                      v-model="tempProduct.description[index]"
                      type="text"
                      class="form-control"
                      id="detailed_description"
                    >
                    </textarea>
                    <button
                      @click="delDescriptionItem(index)"
                      type="button"
                      class="btn btn-outline-danger"
                    >
                      移除
                    </button>
                  </div>
                </div>
                <button
                  @click="addDescriptions"
                  class="btn btn-outline-dark-primary btn-sm mt-2"
                  type="button"
                >
                  新增產品介紹
                </button>
              </div>
              <div class="col-lg-12">
                <div
                  v-for="(item, index) in tempProduct.notes"
                  :key="index"
                  class="mb-2"
                >
                  <label for="detailed_notes" class="form-label">
                    注意事項 {{ index + 1 }}
                  </label>
                  <div class="input-group">
                    <textarea
                      v-model="tempProduct.notes[index]"
                      type="text"
                      class="form-control"
                      id="detailed_notes"
                    >
                    </textarea>
                    <button
                      @click="delNotesItem(index)"
                      type="button"
                      class="btn btn-outline-danger"
                    >
                      移除
                    </button>
                  </div>
                </div>

                <button
                  @click="addNotes"
                  class="btn btn-outline-dark-primary btn-sm mt-2"
                  type="button"
                >
                  新增注意事項
                </button>
              </div>
              <div class="col-lg-12 form-check mx-1">
                <input
                  v-model="tempProduct.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled"> 販售 </label>
              </div>
            </section>
          </form>
        </main>
        <footer class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-dark"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="tempProduct.id"
            @click="$emit('edit-product', tempProduct, pages.current_page)"
            type="button"
            class="btn btn-primary"
          >
            更新產品
          </button>
          <button
            v-else
            @click="$emit('add-product', tempProduct)"
            type="button"
            class="btn btn-primary"
          >
            新增產品
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from "@/mixins/modalMixin";
import "vue-select/dist/vue-select.css";

export default {
  data() {
    return {
      modal: {},
      tempProduct: {
        description: [""],
        notes: [""],
      },
      options: ["水果", "葉菜", "菇菌", "辛香料", "瓜果根球莖"],
      preservationMethods: [
        "冷藏",
        "室溫陰涼乾燥處",
        "冷藏或冷凍",
        "室溫陰涼乾燥處、冷藏或冷凍",
      ],
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    pages: {},
  },

  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },

  methods: {
    uploadFile() {
      const uploadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploadFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http
        .post(url, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
        });
    },
    uploadMultipleImgs() {
      const imgOfIndex = this.tempProduct.images.length - 1;
      const multipleFile = this.$refs[imgOfIndex][0].files[0];
      const formData = new FormData();
      formData.append("file-to-upload", multipleFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http
        .post(url, formData)
        .then((res) => {
          this.tempProduct.images[imgOfIndex] = res.data.imageUrl;
        })
        .catch((error) => {
          this.$pushMsg.status404(error.response.data.message);
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
    addNotes() {
      if (!this.tempProduct.notes) {
        this.tempProduct.notes = [];
      }
      this.tempProduct.notes.push("");
    },
    addDescriptions() {
      if (!this.tempProduct.description) {
        this.tempProduct.description = [];
      }
      this.tempProduct.description.push("");
    },
    delDescriptionItem(index) {
      this.tempProduct.description.splice(index, 1);
    },
    delNotesItem(index) {
      this.tempProduct.notes.splice(index, 1);
    },
  },
  mixins: [ModalMixin],
};
</script>

<style lang="scss" scoped>
.rightContainer {
  height: fit-content;
}

.form-control {
  padding: 4px 4px 4px 10px;
  border-radius: 4px;
  border: 1px solid rgba(60, 60, 60, 0.26);
}
</style>
