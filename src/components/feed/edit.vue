<template lang="pug">
div
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Edit
            span(v-if="!data.pageLoader")
              |  {{getPostTypeLabel(data.post.type) | capitalize }}
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .text-center.m-t-20.m-b-20(v-if="data.pageLoader")
            <preloader />
          <template v-if="!data.pageLoader">
          form.form(@submit.prevent="updatePost()")
            <template v-if="data.post.type === 'text'">
            .form-group(:class="{'has-danger': data.statusError}")
              label Your Status*
              textarea.form-control(type="text" v-model.trim="data.post.content" placeholder = "Type Status")
              small.form-control-feedback(v-if="data.statusError")
                | {{data.statusError}}
            </template>
            <template v-if="data.post.type === 'question'">
            .form-group(:class="{'has-danger': data.questionError}")
              label Question*
              input.form-control(type="text" v-model.trim="data.post.Question.question" placeholder = "Type Question")
              small.form-control-feedback(v-if="data.questionError")
                | {{data.questionError}}
            .form-group
              label Description (optional)
              textarea.form-control(type="text" v-model.trim="data.post.Question.description" placeholder = "Enter Description")
            </template>
            <template v-if="data.post.type === 'video'">
            .form-group(:class="{'has-danger': data.videoTitleError}")
              label Title*
              input.form-control(type="text" v-model.trim="data.post.Video.title" placeholder = "Enter Title")
              small.form-control-feedback(v-if="data.videoTitleError")
                | {{data.videoTitleError}}
            .form-group
              label Description (optional)
              textarea.form-control(type="text" v-model.trim="data.post.Video.description" placeholder = "Enter Description")
            </template>
          </template>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect(type='button' v-if="!data.pageLoader" @click="updatePost()") Save
          <preloader class="preloader-h-20 m-l-5" v-if="data.updating"/>
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
import auth from '@/auth/helpers'
import Service from './service'

function getEditPostInitialState () {
  return {
    post: false,
    pageLoader: true,
    statusError: false,
    questionError: false,
    videoTitleError: false,
    updating: false
  }
}

export default {
  name: 'EditPost',
  service: new Service(),
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-edit-post-modal-',
      data: getEditPostInitialState()
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
        return this.id + '-trigger-modal'
      }
    },
    modalId: {
      get () {
        return this.id + '-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-modal-buton-close'
      }
    }
  },
  watch: {
  },
  methods: {
    trigger (postObj) {
      this.reset()
      document.getElementById(this.triggerButtonId).click()
      auth.getPost(postObj.id, true)
        .then((d) => {
          this.data.pageLoader = false
          this.data.post = d
        })
        .catch((pErr) => {
          this.showNotification('Something went wrong while trying to edit this post.', 'error')
        })
    },
    updatePost () {
      if (this.validate() && !this.data.updating) {
        this.data.updating = true
        this.$options.service.updatePost(this.data.post)
          .then((d) => {
            this.data.updating = false
            if (d.success) {
              this.showNotification(d.message, 'success')
              this.closePopup()
              this.$emit('PostUpdated', this.data.post)
            } else {
              throw new Error('Something wrong')
            }
          })
          .catch((pErr) => {
            this.showNotification('Something went wrong while saving this post. Please try again later.', 'error')
          })
      }
    },
    validate () {
      switch (this.data.post.type) {
        case 'text':
          return this.validateStatus()
        case 'question':
          return this.validateQuestion()
        default:
          return this.validateVideoTitle()
      }
    },
    validateStatus () {
      if (!this.isValidString(this.data.post.content)) {
        this.data.statusError = 'Please enter something'
        return false
      } else {
        this.data.statusError = false
        return true
      }
    },
    validateQuestion () {
      if (!this.isValidString(this.data.post.Question.question)) {
        this.data.questionError = 'Please type your question'
        return false
      } else {
        this.data.questionError = false
        return true
      }
    },
    validateVideoTitle () {
      if (!this.isValidString(this.data.post.Video.title)) {
        this.data.videoTitleError = 'Please enter video title'
        return false
      } else {
        this.data.videoTitleError = false
        return true
      }
    },
    isValidString (str) {
      return str && str.length
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    reset () {
      this.data = getEditPostInitialState()
    }
  }
}
</script>
