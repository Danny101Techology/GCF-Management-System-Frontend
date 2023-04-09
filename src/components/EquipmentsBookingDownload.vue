<template>
    <q-card class="q-ma-sm">
      <div class="q-pa-sm">
        <div class="text-h6 q-mb-sm">Download File</div>
        <div class="row q-gutter-md">
          <div class="col-auto">
            <i class="material-icons" style="font-size: 300px">file_download</i>
          </div>
          <div class="col">
            <a href="https://drive.google.com/" class="text-primary">Click here to download</a>
          </div>
        </div>
      </div>
    </q-card>
  </template>
  
  <script>
  export default {
    name: 'DownloadFileCard'
  }
  </script>
  
  <style scoped>
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
  }
  </style>
  