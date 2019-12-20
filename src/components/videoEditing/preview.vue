<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Video Preview
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .row
            .col-12
              video.w-100(:id="videoPlayerId" :muted = "muted()")
              i.mdi.mdi-replay.pointer.custom-replay-btn(v-if="playerPaused" title = "Replay" @click="rePlay()")
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Cancel
          button.btn.btn-danger.waves-effect.waves-light(@click="saveEditedVideo()")
            | Save
    audio.none(:id="audioPlayerId" loop)
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import Service from './service'
import auth from '@/auth/helpers'

export default {
  name: 'Preview',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-video-editing-preview',
      triggered: false,
      videoBufferingInterval: false,
      editingConfig: false,
      playerPaused: false
    }
  },
  computed: {
    modalIdHash: {
      get () {
        return '#' + this.modalId
      }
    },
    triggerButtonId: {
      get () {
        return this.id + '-video-editing-preview'
      }
    },
    audioPlayerId: {
      get () {
        return this.id + '-video-editing-preview-audio-player'
      }
    },
    videoPlayerId: {
      get () {
        return this.id + '-video-editing-preview-video-player'
      }
    },
    modalId: {
      get () {
        return this.id + '-video-editing-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-video-editing-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    closePopup () {
      let d = document.getElementById(this.closeButtonId)
      if (d) {
        d.click()
      }
    },
    saveEditedVideo () {
      this.$emit('triggerSave')
    },
    muted () {
      return this.editingConfig.backgroundTrack
    },
    getVideoPlayer () {
      return document.getElementById(this.videoPlayerId)
    },
    getAudioPlayer () {
      return document.getElementById(this.audioPlayerId)
    },
    getVideoSrc (videoObj) {
      return 'videoPath' in videoObj ? videoObj.videoPath : videoObj.path
    },
    rePlay () {
      this.playPreview(true)
    },
    playPreview (replay = false) {
      let audioPlayer = this.getAudioPlayer()
      let videoPlayer = this.getVideoPlayer()
      this.playerPaused = false
      if (!replay) {
        audioPlayer.setAttribute('src', this.audioURL(this.editingConfig.backgroundTrack))
        videoPlayer.setAttribute('src', this.getVideoSrcURL(this.editingConfig.videoObj))
      } else {
        audioPlayer.currentTime = 0
        videoPlayer.currentTime = 0
      }
      videoPlayer.play()
      this.initVideoPlayerEvents(videoPlayer, audioPlayer)
    },
    getVideoSrcURL (videoObj) {
      if ('pickLocalVideoSrc' in videoObj && videoObj.pickLocalVideoSrc && auth.getLocalVideoURL()) {
        return auth.getLocalVideoURL()
      }
      return this.getVideoURL(this.editingConfig.videoObj)
    },
    initVideoPlayerEvents (videoPlayer, audioPlayer) {
      /*eslint-disable*/
      let checkInterval  = 50.0 // check every 50 ms (do not use lower values)
      let lastPlayPos    = 0
      let currentPlayPos = 0
      let bufferingDetected = false
      let player = videoPlayer
      this.videoBufferingInterval = setInterval(checkBuffering, checkInterval)
      let pauseAudio = ()=> {
        audioPlayer.pause()
        this.playerPaused = true
        clearInterval(this.videoBufferingInterval)
      }
      let pauseVideoPlayer = ()=> {
        videoPlayer.pause()
        videoPlayer.currentTime = 0
      }
      let that = this
      let trimedVideoCurrentIndex = 0
      let playTrimmedVideo = () => {
        if (this.editingConfig.trim.length) {
          if (this.editingConfig.trim[trimedVideoCurrentIndex]) {
            let slice = this.editingConfig.trim[trimedVideoCurrentIndex]
            let currentTime = videoPlayer.currentTime
            if (currentTime < slice[0]) {
              videoPlayer.currentTime = slice[0]
            }
            if (currentTime > slice[1]) {
              trimedVideoCurrentIndex ++
              playTrimmedVideo()
            }
          } else {
            pauseAudio()
            pauseVideoPlayer()
          }
        }
      }
      function checkBuffering() {
          currentPlayPos = player.currentTime
          playTrimmedVideo()

          // checking offset should be at most the check interval
          // but allow for some margin
          var offset = (checkInterval - 20) / 1000

          // if no buffering is currently detected,
          // and the position does not seem to increase
          // and the player isn't manually paused...
          if (
                  !bufferingDetected 
                  && currentPlayPos < (lastPlayPos + offset)
                  && !player.paused
              ) {
              console.log("buffering")
              bufferingDetected = true
          }

          // if we were buffering but the player has advanced,
          // then there is no buffering
          if (
              bufferingDetected 
              && currentPlayPos > (lastPlayPos + offset)
              && !player.paused
              ) {
              console.log("not buffering anymore")
              bufferingDetected = false
          }
          if (bufferingDetected) {
            audioPlayer.pause()
          } else {
            audioPlayer.play()
          }
          lastPlayPos = currentPlayPos
      }
      videoPlayer.onended = () => {
        pauseAudio()
      }
      videoPlayer.onpause = () => {
        pauseAudio()
      }
      /* videoPlayer.onseeking = () => {
        if (videoPlayer.readyState < videoPlayer.HAVE_FUTURE_DATA) {
          audioPlayer.pause()
        } else {
          audioPlayer.play()
        }
      }
      */
    },
    triggerPopup (config) {
      /*eslint-disable*/
      this.triggered = true
      this.editingConfig = config
      let d = document.getElementById(this.triggerButtonId)
      let clearBufferingInterval = ()=> {
         let that = this
         $(document).on('hidden.bs.modal', '#' + this.modalId, function(){
           clearInterval(that.videoBufferingInterval)
         })
      }
      let play = ()=> {
        d.click()
        this.playPreview()
        clearBufferingInterval()
      }
      if (!d) {
          let interval = setInterval (()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            play()
            clearInterval(interval)
          }
        }, 100)
      } else {
        play()
      }
    }
  }
}
</script>
