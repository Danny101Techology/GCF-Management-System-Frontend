<template>
  <q-card class="q-ma-sm">
    <div class="q-pa-sm">
      <div class="text-h6 q-mb-sm">Download File</div>
      <div class="row q-gutter-md">
        <div class="q-pa-sm">
          <q-btn
            size="85px"
            round
            color="primary"
            icon="download"
            @click="downloadFile"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";

export default {
  name: "DownloadFileCard",
  data() {
    return {
      fileId: null,
      downloadUrl: null,
    };
  },
  methods: {
    async fetchDownloadUrl() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;
      try {
        const response = await axios.get(`/api/equipment-downloads/${this.fileId}`);
        const fileData = response.data;
        const downloadUrl = URL.createObjectURL(
          new Blob([fileData], {
            type:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          })
        );
        const fileName = `${fileData.filename}.docx`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error(error);
      }
    },
    downloadFile() {
      const link = document.createElement("a");
      link.href = this.downloadUrl;
      link.download = "GCF.pptx"; // specify the filename for the downloaded file
      link.click();
    },
  },
  created() {
    this.fileId = "1"; // set the ID of the file you want to download
    this.fetchDownloadUrl();
  },
};
</script>
