<template>
  <div class="q-pa-md">
    <q-uploader
      ref="uploader"
      @added="onFileAdded"
      accept=".docx"
      label="Upload .docx File"
      :noThumbnails="true"
    />
    <!-- <template v-slot:header>
        <div class="q-uploader__header">
          <q-uploader-label
            :title="`Upload .docx File`"
            :subtitle="`Max file size: 2MB`"
          />
          <q-uploader-slot v-model="uploadedFiles" />
        </div>
      </template> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Api from "@/api/Api";
import store from "@/store/index.js";


import useQuasar from "quasar/src/composables/use-quasar.js";

const $q = useQuasar();

const uploadedFiles = ref([]);

const onFileAdded = async (files) => {

  // Filter out non-.docx files
  const docxFiles = files.filter((file) => file.name.endsWith(".docx"));

  if (docxFiles.length > 0) {
    // Upload each .docx file
    for (const file of docxFiles) {
      try {
        const formData = new FormData();
        formData.append("data", JSON.stringify({}));
        formData.append("files.file", file);
        formData.append("ref", "equipment-reservations");
        formData.append("field", "Upload");

        // Make axios request to upload file
        await axios.post(`/api/equipment-reservations`, {
          file: file,
          upload: true,
        });

        // Add uploaded file to uploadedFiles array
        uploadedFiles.value.push(file);

        // Notify user of successful upload
        // Replace with appropriate notification method for your app
        alert(`${file.name} uploaded successfully!`);
      } catch (error) {
        // Handle error
        console.error("Error uploading file:", error);
        // Notify user of upload failure
        // Replace with appropriate notification method for your app
        alert(`Failed to upload ${file.name}. Please try again.`);
      }
    }
  }
};
</script>
