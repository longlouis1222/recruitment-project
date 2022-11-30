<script setup>
import { ref } from "vue";
import MethodService from "../service/MethodService";
import toastr from "toastr";
import { defineEmits, defineProps, onBeforeUpdate } from "vue";

const emit = defineEmits([""]);
const props = defineProps({
  propsIdAvatar: String,
  disabled: String,
});
let anh_url = ref("");
let anh_show = ref(false);
let removeAnh = ref(false);
const isDisable = ref(false);
//const $image = ref(null);
const fn_upload = async () => {
  try {
    let nameImage = document.getElementById("uploadImage").files[0]?.name;
    let typeImage = nameImage?.slice(nameImage.indexOf(".")).toLowerCase();
    console.log("typeImage", typeImage);
    if (typeImage) {
      if (
        typeImage !== ".jpg" &&
        typeImage !== ".png" &&
        typeImage !== ".jpeg"
      ) {
        toastr.warning("Vui lòng chọn đúng định dạng file ảnh");
        fn_remove();
      } else {
        // let res = await mushroom.$file.uploadAsync({
        //   file: document.getElementById("uploadImage").files[0],
        // });
        emit("uploadImage", res.result);
        anh_show.value = true;
        // anh_url.value = mushroom.$file.linkBuilder.thumb.id(res.result).build();
      }
    }
  } catch (e) {
    console.log(e);
    MethodService.showError(e.code);
  }
};

const fn_remove = () => {
  emit("removeImage", "");
  removeAnh.value = true;
  anh_show.value = false;
  anh_url.value = "";
};

onBeforeUpdate(() => {
  console.log("props.propsIdAvatar", props.propsIdAvatar);
  console.log("props.disabled", props.disabled);
  if (props.propsIdAvatar) {
    // anh_url.value = mushroom.$file.linkBuilder.thumb
    //   .id(props.propsIdAvatar)
    //   .build();
    anh_show.value = true;
  }
  console.log("removeAnh.value", removeAnh.value);
  props.disabled === "true"
    ? (isDisable.value = true)
    : (isDisable.value = false);
});

// });
</script>
<template>
  <div class="image-zone" :class="{ imageZoneDisable: isDisable }">
    <div class="image-show" v-if="anh_show">
      <img style="width: 100%" :src="anh_url" alt="ảnh đại diện" id="image" />
      <button
        type="button"
        :disabled="props.disabled === 'true'"
        style="display: none"
        class="btn btn-danger btn-icon waves-effect waves-light"
        @click="fn_remove()"
      >
        <i class="ri-delete-bin-5-line"></i>
      </button>
    </div>
    <div class="image-btn" v-else>
      <label for="uploadImage">
        <i class="ri-image-add-line"></i>Ảnh đại diện
      </label>
      <input
        :disabled="props.disabled === 'true'"
        type="file"
        accept=".jpg, .png, .jpeg, .JPEG"
        id="uploadImage"
        style="display: none"
        @change="fn_upload"
      />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.image-zone {
  border: 1px dashed #409eff;
  border-radius: 5px;
  padding: 5px;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-show {
  position: relative;
  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    max-height: 200px;
  }
  img,
  .btn-danger {
    transition: 0.3s;
  }
  &:hover img {
    opacity: 0.8;
  }
  &:hover .btn-danger {
    display: block !important;
  }
}
.image-btn {
  background-color: #0ab39c;
  color: #fff;
  transition: 0.3s;
  padding: 5px;
  border-radius: 5px;
  label {
    cursor: pointer;
    margin-bottom: 0;
  }
  i {
    margin-right: 5px;
  }
}
.imageZoneDisable {
  background-color: #f5f7fa;
  cursor: no-drop;
}
</style>

