<template lang="pug">
.row
  .col-12.public-page-content-wrap
    .text-center
      h2.font-alt Guidelines for video answers
    .m-t-40
      h4.m-l-10.all-caps What is a video answer or video comment?
      p
        | Video answer is basically a short video clip made in response to a given question asked on the platform. So, say there can be a question, such as "Show us your Pet?" and people can make a very small video clip (ideally 10-15 seconds) and post it as a response to that question. After you post it, a site moderator will review the video and upon their approval, you will get paid. If they reject it, you will not be paid for that video. You get notified about the status of the video via an on-site notification and an email.

      h4.m-l-10.all-caps Guidelines
      ol
        li
          | Video should ideally be shot in landscape mode.
        li
          | Video should ideally be 10-15 seconds long. It could even be shorter and even longer. It should be just long enough so it makes sense.
        li
          | You should always try to show some creativity and make the video as interesting as possible, by adding some background music, some effects, etc. You can use any third party video editing app such as VivaVideo for basic and very easy video editing.
        li
          | Uploaded video answers must not have any watermark or branding of any other third party services.
        li
          | Your video should try to show things/actions that are not too common for people to see in their every day lives. Your videos will be considered valuable and be paid for when they show some unique and interesting things/actions or at least are presented in entertaining or creative ways.
      p
        | Hope you'd create the content which people, as well as you yourself will love to watch.
    h4.m-l-10.all-caps Content Uniqueness
    ol
      li
        | To make sure we have only unique content available on the platform, we have created an AI powered bots that crawl other video sharing platforms and match the videos against the videos uploaded on the platform.
      li
        | If any video answer you have uploaded on {{siteName}} is found on another platform, we might take some strict actions against as you as that would be a violation of {{siteName}}’s User Uploaded Conetent policies. In which case, you will be liable to pay a heavy fine.
    h4.m-l-10.all-caps Payment for Video Answers
    p
      | To know more about how you will get paid, please
      a(href="/#contact")
        |  contact us
      | . We will be very happy to appreciate your efforts, creativity and value that you put in your content.
    h4.m-l-10.all-caps Reasons your video answer could be deleted or be unpaid
    ol
      li
        | The video answer does not answer the question.
      li
        | The video answer belongs to some other question.
      li
        | The video answer is too long or too short. Ideally, it should be 10-15 seconds long, as long as it is able to makes sense.
      li
        | The video answer is not unique and has either been uploaded already or was found on some other website/app.
      li
        | Video comment/answer is inappropriate and contains objectionable content.
</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'VideoAnswerGuidelines',
  metaInfo () {
    return {
      title: this.getPageTitle('Guidelines for video answers')
    }
  },
  mixins: [mixin],
  mounted () {
    this.scrollToTop()
  }
}
</script>
