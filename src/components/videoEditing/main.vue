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
          #accordionExample.accordion.accordion-blue
            .card
              #headingOne.card-header(data-toggle='collapse', data-target='#collapseOne', aria-expanded='true', aria-controls='collapseOne')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-music.m-r-10
                    span.tab-label
                      | Background Music
              #collapseOne.collapse(aria-labelledby='headingOne', data-parent='#accordionExample')
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            .card
              #headingTwo.card-header(data-toggle='collapse', data-target='#collapseTwo', aria-expanded='true', aria-controls='collapseTwo')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-cut.m-r-10
                    span.tab-label
                      | Trim Video
              #collapseTwo.collapse(aria-labelledby='headingTwo', data-parent='#accordionExample')
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            .card
              #headingThree.card-header(data-toggle='collapse', data-target='#collapseThree', aria-expanded='true', aria-controls='collapseThree')
                h2.mb-0
                  button.btn(type='button')
                    i.fa.fa-image.m-r-10
                    span.tab-label
                      | Video Screenshot
              #collapseThree.collapse(aria-labelledby='headingThree', data-parent='#accordionExample')
                .card-body
                  | Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.

          //div
            ul.nav.nav-tabs.customtab(role='tablist')
              li.nav-item
                a.nav-link.active(data-toggle='tab', :href="'#' + getTabId(1)", role='tab' , aria-expanded='true')
                  // span.hidden-sm-up
                    i.ti-home
                  span Background Music
              li.nav-item
                a.nav-link(data-toggle='tab', :href="'#' + getTabId(2)", role='tab' , aria-expanded='false')
                  // span.hidden-sm-up
                    i.ti-user
                  span Trim Video
              li.nav-item
                a.nav-link(data-toggle='tab', :href="'#' + getTabId(3)", role='tab' , aria-expanded='false')
                  // span.hidden-sm-up
                    i.ti-email
                  span Video Screenshot
            .tab-content
              .tab-pane.active(:id="getTabId(1)" role='tabpanel', aria-expanded='false')
                .p-20
                  h3 Best Clean Tab ever
                  h4 you can use it with the small code
                  p
                    | Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a.
              .tab-pane.p-20(:id="getTabId(2)" role='tabpanel', aria-expanded='false') 2
              .tab-pane.p-20(:id="getTabId(3)" role='tabpanel', aria-expanded='false') 3
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
    getTabId (index) {
      return this.id + '-tab-' + index
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
