<template lang="pug">
section.module.bg-dark-60.pt-0.pb-0.testimonial(:style="getTheImage('testimonial-background.png', true, true)")
  .testimonials-slider.pt-140.pb-140
    .flex-viewport
      ul.slides
        li.clone(aria-hidden='true' v-for="t in testimonials")
          .container
            .row
              .col-sm-12
                .module-icon
                  span.icon-quote
            .row
              .col-sm-8.col-sm-offset-2
                blockquote.testimonial-text.font-alt
                  | {{t.text}}

            .row
              .col-sm-4.col-sm-offset-4
                .testimonial-author
                  .testimonial-caption.font-alt
                    .testimonial-title {{t.title}}
                    .testimonial-descr {{t.subTitle}}
    ol.flex-control-nav.flex-control-paging
      li
        a(href='#') 1
      li
        a.flex-active(href='#') 2
      li
        a(href='#') 3
    ul.flex-direction-nav
      li.flex-nav-prev
        a.flex-prev(href='#') Previous
      li.flex-nav-next
        a.flex-next(href='#') Next
</template>
<script>
import mixin from '../../../globals/mixin'
export default {
  name: 'Testimonial',
  mixins: [mixin],
  data () {
    return {
      testimonials: [
        {
          text: 'This app is really great because it gives you real money by just watching short ads.',
          title: 'Rishab Naagar',
          subTitle: 'Delhi'
        }, {
          text: 'This all is so easy to use, very simple and well designed. I will recommend everyone to learn and earn money online using this website.',
          title: 'Nikhil Guglani',
          subTitle: 'Punjab'
        }, {
          text: 'This is a wonderful website which is easy to use and easy to understand. You get to learn and make some quick money unlike any other social media platform.',
          title: 'Pooja Mishra',
          subTitle: 'Rajasthan'
        }, {
          text: 'To be honest this website is really good.',
          title: 'Amitabh Goswami',
          subTitle: 'Gujrat'
        }, {
          text: 'This website is the best of the best because it really paid me money for watching ads. trust me you won\'t regret after using this website.',
          title: 'Ankita Chitlangia',
          subTitle: 'Maharashtra'
        }, {
          text: 'An excellent and awesome program. Very easy to use and great videos.',
          title: 'Pun Lary',
          subTitle: 'Assam'
        }, {
          text: 'This app is very useful and made my life better.',
          title: 'Mansi Saxena',
          subTitle: 'Karnataka'
        }

      ]
    }
  }
}
</script>
