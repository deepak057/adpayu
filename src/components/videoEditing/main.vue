<template lang="pug">
div(v-if="triggered")
  span(:id="triggerButtonId" data-toggle="modal" :data-target="modalIdHash" data-keyboard="false")
  .modal.modal-append-to-body.topmost-modal(:id="modalId" tabindex='-1', role='dialog', aria-label.smallledby='AdStatsModallabel.small', aria-hidden='true')
    .modal-dialog.modal-lg
      .modal-content
        .modal-header
          h4.modal-title
            | Edit Video
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        .modal-body
          .accordion.accordion-blue(:id="getSectionId(0)")
            .card
              .card-header(:id="getSectionId(1, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(1)", aria-expanded='true', :aria-controls='getSectionId(1)')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-music.m-r-10
                    span.tab-label
                      | Background Music
              .collapse(:id="getSectionId(1)" :aria-labelledby="getSectionId(1, header)", :data-parent="'#'+getSectionId(0)")
                .card-body
                  .row
                    .col-lg-4.col-md-6
                      .card.m-b-30
                        .card-body
                          .row
                            .col-4
                              .pointer.round.round-lg.align-self-center.round-info
                                i.mdi.mdi.mdi-play
                            .col-8.p-0
                              .m-l-10.align-self-center
                                h4.m-b-0.font-light
                                  a.c-inherit(href='/tag/general') General
                                h5.m-t-5.text-muted.m-b-0
                                  span
                                    span.pointer Add
                                    .btn-group(style='display: none;')
                                      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                                        i.fa.fa-check.m-r-5
                                        span Following
                                      .dropdown-menu
                                        a.dropdown-item(href='javascript:void(0)') Unfollow
                    .col-lg-4.col-md-6
                      .card.m-b-30
                        .card-body
                          .row
                            .col-4
                              .pointer.round.round-lg.align-self-center.round-info
                                i.mdi.mdi.mdi-play
                            .col-8.p-0
                              .m-l-10.align-self-center
                                h4.m-b-0.font-light
                                  a.c-inherit(href='/tag/general') General
                                h5.m-t-5.text-muted.m-b-0
                                  span
                                    span.pointer Add
                                    .btn-group(style='display: none;')
                                      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                                        i.fa.fa-check.m-r-5
                                        span Following
                                      .dropdown-menu
                                        a.dropdown-item(href='javascript:void(0)') Unfollow
                    .col-lg-4.col-md-6
                      .card.m-b-30
                        .card-body
                          .row
                            .col-4
                              .pointer.round.round-lg.align-self-center.round-info
                                i.mdi.mdi.mdi-play
                            .col-8.p-0
                              .m-l-10.align-self-center
                                h4.m-b-0.font-light
                                  a.c-inherit(href='/tag/general') General
                                h5.m-t-5.text-muted.m-b-0
                                  span
                                    span.pointer Add
                                    .btn-group(style='display: none;')
                                      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                                        i.fa.fa-check.m-r-5
                                        span Following
                                      .dropdown-menu
                                        a.dropdown-item(href='javascript:void(0)') Unfollow
                    .col-lg-4.col-md-6
                      .card.m-b-30
                        .card-body
                          .row
                            .col-4
                              .pointer.round.round-lg.align-self-center.round-info
                                i.mdi.mdi.mdi-play
                            .col-8.p-0
                              .m-l-10.align-self-center
                                h4.m-b-0.font-light
                                  a.c-inherit(href='/tag/general') General
                                h5.m-t-5.text-muted.m-b-0
                                  span
                                    span.pointer Add
                                    .btn-group(style='display: none;')
                                      button.btn.btn-secondary.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                                        i.fa.fa-check.m-r-5
                                        span Following
                                      .dropdown-menu
                                        a.dropdown-item(href='javascript:void(0)') Unfollow
            .card
              .card-header(:id="getSectionId(2, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(2)", aria-expanded='true', :aria-controls='getSectionId(2)')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-cut.m-r-10
                    span.tab-label
                      | Trim Video
              .collapse(:id="getSectionId(2)" :aria-labelledby="getSectionId(2, header)", :data-parent="'#'+getSectionId(0)")
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            .card
              .card-header(:id="getSectionId(3, 'header')" data-toggle='collapse', :data-target="'#'+getSectionId(3)", aria-expanded='true', :aria-controls='getSectionId(3)')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-image.m-r-10
                    span.tab-label
                      | Video Screenshot
              .collapse(:id="getSectionId(3)" :aria-labelledby="getSectionId(3, header)", :data-parent="'#'+getSectionId(0)")
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        .modal-footer
          button.btn.btn-default.waves-effect(type='button', data-dismiss='modal' :id="closeButtonId") Close
          button.btn.btn-danger.waves-effect.waves-light(@click="proceedToPay()")
            | Preview
</template>
<script>
import mixin from '../../globals/mixin'
import Preloader from '../preloader'
// import auth from '@/auth/helpers'

export default {
  name: 'VideoEditing',
  components: {
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      pageLoader: true,
      id: this.getUniqueId() + '-video-editing',
      triggered: false
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
        return this.id + '-video-editing'
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
      document.getElementById(this.closeButtonId).click()
    },
    getSectionId (index, type_ = 'collapse') {
      return this.id + '-' + type_ + '-' + index
    },
    triggerPopup () {
      /*eslint-disable*/
      this.triggered = true
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
    }
  }
}
</script>
