<template>
  <div class="uploader">
    <n-upload
      :default-upload="true"
      :max="maxImageNumber - files.length"
      :on-update:file-list="openFiles"
      :show-file-list="false"
      accept="image/*"
      class="uploader-input"
      multiple
      name="file"
      type="file"
    >
      <n-upload-dragger class="uploader-dnd">
        <div>
          <n-icon :component="ImagesOutline" :depth="3" size="60"></n-icon>
        </div>

        <n-text style="font-size: 16px">
          Нажмите или переметите файлы для загрузки.
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0; text-align: center">
          Обратите внимание, что вы не можете создать пост не добавив ни единого изображения к нему.
          Кроме того, максимально допустимое количество изображений у одного поста - 10.
        </n-p>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script setup>
import { useDialog, NUploadDragger, NIcon, NText, NUpload, NP } from "naive-ui";
import { ImagesOutline } from "@vicons/ionicons5";

const emit = defineEmits(["uploaded"]);
const props = defineProps({
  maxImageNumber: Number,
  files: Array
});
const dialog = useDialog();

function openFiles(fileList) {
  console.log();
  if (props.files.length === props.maxImageNumber) {
    dialog.warning({
      title: "Превышен лимит!",
      content: "Максимально допустимое количество изображений для одного поста: " + props.maxImageNumber
    });
  } else {
    let fileItem = fileList.pop();
    props.files.push({
      src: URL.createObjectURL(fileItem.file),
      cropper: null,
      zoom: 0,
      rotation: 0,
      data: null,
      box: null,
      canvas: null
    });
    emit("uploaded");
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;

  .uploader-input {
    width: 300px;
    height: 300px;

    .uploader-dnd {
      background-color: transparent;
      border: none;
    }
  }
}
</style>