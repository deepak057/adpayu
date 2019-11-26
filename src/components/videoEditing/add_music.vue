<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" data-backdrop="static" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Add Music
            i.mdi.mdi-information-outline.cursor-hand.m-l-5(data-container="body" title="Upload a Music File" data-toggle="popover" data-placement="right" data-content="You can contribute to our open source Music Library by uploading an open source or free-to-use music file which will also be publicly available for others to use as background music in their videos.")
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body.p-b-0
          div
            form(@submit.prevent="addTrack()")
              .form-group(:class="{'has-danger': error.nameError}")
                label(:for="trackTitleFieldId") Track Name/Title*
                input.form-control(v-model="track.name" type="text" placeholder="Enter here" :id="trackTitleFieldId")
                small.form-control-feedback(v-if="error.nameError") {{error.nameError}}
              .form-group(:class="{'has-danger': error.genereError}")
                label(:for="trackGenereFieldId") Genere*
                select.form-control.custom-select(v-model="track.genere" :id="trackGenereFieldId")
                  option(value="" selected="selected" disabled="disabled" hidden="hidden") Please select
                  <template v-if="musicCategories">
                  option(v-for="cat in musicCategories" v-if="cat.id" :value="cat.id") {{cat.label}}
                  </template>
                small.form-control-feedback(v-if="error.genereError") {{error.genereError}}
              .form-group.m-b-10(:class="{'has-danger': error.pathError}")
                <template v-if="!uploadPercentage">
                label.pointer(@click="triggerFileUpload()" :class="{'m-b-0': error.pathError}")
                  i.mdi.mdi-upload.m-r-2.v-align-top.f-s-20
                  | Upload Music File*
                small.form-control-feedback.block(v-if="error.pathError") {{error.pathError}}
                </template>
                <template v-if="uploadPercentage">
                div
                  <preloader class="m-r-5 preloader-next-to-text" v-if="!track.path"/>
                  i.mdi.mdi-check-all.m-r-5(v-if="track.path")
                  | {{getFileUploadProgressText()}}
                  i.fa.fa-trash.m-l-5.pointer(@click="resetFileUpload()" v-if="track.path" title="Remove this file")
                </template>
                input.none(:accept="getAcceptedAudioString()" type="file" :id="fileElementId" @change="filesChange($event.target.name, $event.target.files)" onclick="this.value=null;")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Cancel
          button.btn.btn-danger.waves-effect.waves-light(@click="addTrack()" :disabled="saving")
            | Add
          <preloader class="m-l-5 preloader-next-to-text" v-if="saving"/>
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Service from './service'

function AddMusicInitialState (id, triggered = false) {
  return {
    id: id,
    triggered: triggered,
    uploadPercentage: 0,
    saving: false,
    acceptedAudioFileTypes: [
      'audio/mp3'
    ],
    track: {
      name: '',
      path: '',
      genere: ''
    },
    error: {
      nameError: false,
      pathError: false,
      genereError: false
    }
  }
}

export default {
  name: 'AddMusic',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  props: {
    musicCategories: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return AddMusicInitialState(this.getUniqueId() + '-add-music-modal')
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    },
    triggerButtonId: {
      get () {
        return this.id + '-add-music-modal-trigger'
      }
    },
    trackTitleFieldId: {
      get () {
        return this.id + '-add-music-track-title'
      }
    },
    trackGenereFieldId: {
      get () {
        return this.id + '-add-music-genere-field'
      }
    },
    fileElementId: {
      get () {
        return this.id + '-upload-music-file'
      }
    },
    modalId: {
      get () {
        return this.id + '-add-music-modal-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-add-music-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    resetFileUpload () {
      let path = this.track.path
      this.track.path = ''
      this.uploadPercentage = 0
      this.error.pathError = false
      if (path) {
        this.$options.service.deleteAudioFile(path)
      }
    },
    reset () {
      Object.assign(this.$data, AddMusicInitialState(this.id, true))
    },
    getAcceptedAudioString () {
      return this.acceptedAudioFileTypes.join(',')
    },
    validateAudioFile (files) {
      let valid = true
      if (this.acceptedAudioFileTypes.indexOf(files[0]['type']) === -1) {
        valid = false
      }
      return valid
    },
    filesChange (event, files) {
      if (files.length && this.validateAudioFile(files)) {
        this.uploadAudioFile(files)
      } else {
        alert('Please choose a valid video file')
      }
    },
    uploadAudioFile (files) {
      let formData = new FormData()
      formData.append('audio', files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }.bind(this)
      }
      this.$options.service.uploadAudioFile(formData, config)
        .then((data) => {
          this.track.path = data.path
        })
        .catch((errVideo) => {
          this.showNotification('Something went wrong while uploading the music file', 'error')
        })
    },
    getFileUploadProgressText () {
      if (!this.track.path) {
        if (this.uploadPercentage < 100) {
          return 'Uploading file...' + this.uploadPercentage + '%'
        } else {
          return 'Processing...'
        }
      } else {
        return 'File uploaded'
      }
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    triggerFileUpload () {
      document.getElementById(this.fileElementId).click()
    },
    addTrack () {
      if (this.validation()) {
        this.saving = true
        this.$options.service.saveTrack(this.track)
          .then((d) => {
            this.showNotification(d.message, 'success')
            this.reset()
          })
          .catch((tErr) => {
            this.showNotification('Something went wrong. Please try again.', 'error')
            this.saving = false
          })
      }
    },
    validation () {
      return this.validateName() && this.validateCategory() && this.validateFile()
    },
    validateName () {
      if (this.track.name) {
        this.error.nameError = false
        return true
      } else {
        this.error.nameError = 'Please enter track name'
        return false
      }
    },
    validateCategory () {
      if (this.track.genere) {
        this.error.genereError = false
        return true
      } else {
        this.error.genereError = 'Please select a category'
        return false
      }
    },
    validateFile () {
      if (this.track.path) {
        this.error.pathError = false
        return true
      } else {
        this.error.pathError = 'Please upload a file'
        return false
      }
    },
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval(()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
      }
    }
  }
}
</script>
