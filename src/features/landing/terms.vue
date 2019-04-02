<template lang="pug">
.main
  section.module.p-40
    .container
      .row
        .col-12.public-page-content-wrap
          .text-center
            h2.font-alt Terms & Conditions
          p.m-t-40 Our Terms & Consitions were last updated and posted on 2nd April, 2019
          p By signing up, you indicate that you agree to our terms and conditions.
          p
            | You are not allowed to upload any picture anywhere on the site that might be perceived as sexually explicit or obscene in nature. We are highly against such actions and can’t tolerate them. You are requested to keep the website safe and clean for people of any age group or community.
          p
            | A person can report against others on following grounds-
            br
            | The person witnesses or receives content belonging to or produced by another that may contain :
          p
            | Violence and Threats
            br
            | Self-Harm
            br
            | Bullying and Harassment
            br
            | Hate Speech
            br
            | Disturbing Graphic Content
            br
            | Phishing and Spam
            br
            | Security breach
          p
            | Website administrators can access and delete or alter your account settings and other personal data if necessary for probing purposes in case someone reports against you.
          p
            | You agree that you will not provide false information during signing up and will maintain only one legitimate {{siteName}} account.
          p
            | You agree that you will never intentionally try to put efforts to damage website by means of uploading virus affected content or carrying out other hacking attacks. You understand that any damage caused by you could cause a lot of inconvenience to others and may take some time and efforts from our side to be recovered.
          p We reserve all rights not expressly granted to you.
          p
            | We hold the right to permanently delete your account without any prior notification or communication if the terms are violated to a serious extent. The same action can be taken not only for these terms but also for unforeseen activities that might be deemed as unacceptable. We are highly in favor of Freedom of Expression. However We expect you to be able to judge whether your own activities lie within certain boundaries.

</template>
<script>
import mixin from '../../globals/mixin'

export default {
  name: 'Terms',
  mixins: [mixin],
  mounted () {
    this.scrollToTop()
  }
}
</script>
