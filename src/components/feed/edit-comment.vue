<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-backdrop="static" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | {{getText()}}
          button.close(:id="closeButtonId" type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          form.form(@submit.prevent="saveComment()")
            .form-group(v-if="!isQuestion()")
              textarea.form-control.min-textarea-height(v-model.trim="comment" :placeholder = "getText('placeholder')")
            .form-group(v-if="isQuestion()")
              <vue-editor useCustomImageHandler :placeholder = "getText('placeholder')" @imageAdded="handleImageAdded" v-model.trim="comment"></vue-editor>
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Cancel
          button.btn.btn-danger.waves-effect.waves-light(@click = "saveComment()" :disabled = "loader") Save
          <preloader class="m-l-5 preloader-next-to-text" v-if="loader"/>
</template>
<script>
import mixin from '../../globals/mixin.js'
import commentMixin from './comment-mixin.js'
import Service from './service'
import { VueEditor } from 'vue2-editor'
import Preloader from '../../components/preloader'

export default {
  name: 'EditComment',
  service: new Service(),
  components: {
    VueEditor,
    Preloader
  },
  mixins: [mixin, commentMixin],
  data () {
    return {
      id: this.getUniqueId() + '-comment-editing',
      triggered: false,
      commentObj: {},
      commentType: '',
      loader: false,
      comment: ''
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
        return this.id + '-comment-editing'
      }
    },
    modalId: {
      get () {
        return this.id + '-comment-editing-modal'
      }
    },
    closeButtonId: {
      get () {
        return this.id + '-comment-editing-modal-buton-close'
      }
    }
  },
  mounted () {
  },
  methods: {
    triggerPopup (commentObj, commentType) {
      /*eslint-disable*/
      this.triggered = true
      this.commentObj = this.copyObject(commentObj)
      this.commentType = commentType
      this.comment = commentObj.comment
      let d = document.getElementById(this.triggerButtonId)
      if (!d) {
          let interval = setInterval (()=> {
          d = document.getElementById(this.triggerButtonId)
          if (d) {
            d.click()
            clearInterval(interval)
          }
        }, 100)
      } else {
        d.click()
      }
      /* eslint-enable */
    },
    closePopup () {
      document.getElementById(this.closeButtonId).click()
    },
    getText (type = 'modal') {
      if (this.isVideoComment(this.commentObj)) {
        return type === 'modal' ? (this.commentObj.comment ? 'Edit Details' : 'Add Details') : 'Enter Details'
      } else {
        return (type === 'modal' ? 'Edit ' : 'Enter your ') + this.getCommentType()
      }
    },
    saveComment () {
      if (this.loader) {
        return
      }
      if (!this.isVideoComment(this.commentObj) && !this.comment) {
        alert('Sorry, your ' + this.getCommentType() + ' can not be empty. Please write something.')
        return true
      }
      this.loader = true
      this.$options.service.updateComment(this.commentObj.id, this.comment)
        .then((d) => {
          this.loader = false
          this.$emit('CommentEdited', this.comment)
          this.closePopup()
          this.showNotification('Changes saved successfully', 'success')
        })
        .catch((cErr) => {
          this.loader = false
          this.showNotification('Something went wrong while saving it', 'error')
        })
    }
  }
}
</script>
