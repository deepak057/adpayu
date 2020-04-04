<template lang="pug">
div
    .top-bar-sticker-nav(v-if="!siteIntro.enable")
        .font-alt
            i.fa.fa-info-circle.faded-color
            |  People Ask Questions, Others leave Video Answers
    section.hpv-contanier.text-center.full-height.d-table.d-table
        <template v-if="siteIntro.enable">
        .hp-site-intro-wrap.all-caps(:class="{'fade-out': siteIntro.animationOn}")
            .font-alt.mb-30.titan-title-size-1
                | A content network
            .font-alt.mb-40.titan-title-size-4
                | {{slogan}}
            .font-alt.mb-10.titan-title-size-1
                | See how >>
            .font-alt.mb-30.titan-title-size-1
                <preloader class="w-15px"/>
        </template>
        <template v-if="!siteIntro.enable">
        .video-container-section
            .header-wrap
                .font-alt.all-caps
                    h2(v-if="!isMobile()")
                        | {{currentPost.title}}
                    h3(v-if="isMobile()")
                        | {{currentPost.title}}
            .body-wrap.m-t-10
                video(:id="videoPlayerId" muted :class="{'w-100': isMobile()}" :src="currentPost.videoPath" autoplay)
                //.video-overlay(v-if="!isMobile()")
                .btns-wrap(:class="{'btn-center': !isMobile(), 'm-t-40': isMobile()}")
                    <router-link to="/signup" class="btn btn-info btn-round color-white">
                      | Sign Up
                    </router-link>
                    <router-link to="/login" class="btn btn-border-w btn-round highlighted-button m-l-10">
                      | Log In
                    </router-link>
            .footer-wrap.m-t-10()
                .font-alt
                    // i.fa.fa-info-circle.text-muted
                    |  {{slogan}}
        </template>
    //section#home.home-section.custom-home.home-full-height.bg-dark.bg-gradient
        .hpv-container
            video.home-page-full-video(autoplay loop id="home-page-video")
                source(src="https://d22tzv0y5oufao.cloudfront.net/480/1vo6164k8183qq428957.mp4")
            //.hp-overlay
        .titan-caption
            .caption-content
                .font-alt.mb-30.titan-title-size-1 A content network
                .font-alt.mb-40.titan-title-size-4 {{slogan}}
                <router-link to="/signup" class="btn btn-info btn-round color-white">
                  | Sign Up
                </router-link>
                <router-link to="/login" class="btn btn-border-w btn-round highlighted-button m-l-10">
                  | Log In
                </router-link>
    .main
        section#services.module.p-b-0
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt About
                        .module-subtitle.font-serif
                            | It's a content and social media platform where for the first time in history, you get paid for spending time on social media. As time is money.
                            br
                            br
                            | In addition to having its own DNA, it combines best of modern social media features, protects your privacy and at the same time doesn't sell or monitor your data.
                .row.multi-columns-row
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-video
                            h3.features-title.font-alt Upload and Watch Video
                            p
                                | Upload short self made video answers or comments on various interesting questions and watch other's. It's lot of fun.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-quote
                            h3.features-title.font-alt Questions and Answers
                            p
                                | Spread knowledge. Ask questions and write answers.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-chat
                            h3.features-title.font-alt Status update
                            p
                                | Let the world or your friends know what you are up to. Optionally share pictures and let people comment and appreciate them.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-wallet
                            h3.features-title.font-alt Make money
                            p
                                | Consume beautiful and entertaining ads in your feed and get paid. Withdraw money to your bank or Paytm account.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-adjustments
                            h3.features-title.font-alt Content tagging and filtering
                            p
                                | Tag your content to various categories. Filter content and follow desired categories to see the content of your interest in your feed.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-megaphone
                            h3.features-title.font-alt Create ads
                            p
                                | Create content (video, question or status) and easily turn it into an ad. Review ad stats and track how your ad is doing.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-search
                            h3.features-title.font-alt Content Search
                            p
                                | In addition to searching content (questions, video etc), easily search users and categories. Search is highly optimised for speed.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-profile-male
                            h3.features-title.font-alt Profiles and Friends
                            p
                                | Maintain your profile and request or accept friendship with others. You can choose to share content privately only with your friends.
                    .col-12.text-center
                      <router-link class="btn btn-warning m-t-80" to="/signup">
                        | Free Sign Up
                      </router-link>
        // section.module.bg-dark-60(data-background='static/titan-master/assets/images/section-6.jpg')
            .container
                .row
                    .col-sm-12
                        .video-box
                            .video-box-icon
                                a.video-pop-up(href='https://www.youtube.com/watch?v=TTxZj3DZiIM')
                                    span.icon-video
                            .video-title.font-alt Presentation
                            .video-subtitle.font-alt Watch the video about our new products
        // section#works.module.pb-0
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Our Works
                        .module-subtitle.font-serif
            .container
                .row
                    .col-sm-12
                        ul#filters.filter.font-alt
                            li
                                a.current.wow.fadeInUp(href='#', data-filter='*') All
                            li
                                a.wow.fadeInUp(href='#', data-filter='.illustration', data-wow-delay='0.2s') Illustration
                            li
                                a.wow.fadeInUp(href='#', data-filter='.marketing', data-wow-delay='0.4s') Marketing
                            li
                                a.wow.fadeInUp(href='#', data-filter='.photography', data-wow-delay='0.6s') Photography
                            li
                                a.wow.fadeInUp(href='#', data-filter='.webdesign', data-wow-delay='0.6s') Web Design
            ul#works-grid.works-grid.works-grid-gut.works-grid-3.works-hover-w
                li.work-item.illustration.webdesign
                    a(href='portfolio-single-1.html')
                        .work-image
                            img(src='static/titan-master/assets/images/work-1.jpg', alt='Portfolio Item')
                        .work-caption.font-alt
                            h3.work-title Corporate Identity
                            .work-descr Illustration
                li.work-item.marketing.photography
                    a(href='portfolio-single-1.html')
                        .work-image
                            img(src='static/titan-master/assets/images/work-2.jpg', alt='Portfolio Item')
                        .work-caption.font-alt
                            h3.work-title Bag MockUp
                            .work-descr Marketing
                li.work-item.illustration.photography
                    a(href='portfolio-single-1.html')
                        .work-image
                            img(src='static/titan-master/assets/images/work-3.jpg', alt='Portfolio Item')
                        .work-caption.font-alt
                            h3.work-title Disk Cover
                            .work-descr Illustration
                li.work-item.marketing.photography
                    a(href='portfolio-single-1.html')
                        .work-image
                            img(src='static/titan-master/assets/images/work-4.jpg', alt='Portfolio Item')
                        .work-caption.font-alt
                            h3.work-title Business Card
                            .work-descr Photography
                li.work-item.illustration.webdesign
                    a(href='portfolio-single-1.html')
                        .work-image
                            img(src='static/titan-master/assets/images/work-5.jpg', alt='Portfolio Item')
                        .work-caption.font-alt
                            h3.work-title Business Card
                            .work-descr Webdesign
                li.work-item.marketing.webdesign
                    a(href='portfolio-single-1.html')
                        .work-image
                            img(src='static/titan-master/assets/images/work-6.jpg', alt='Portfolio Item')
                        .work-caption.font-alt
                            h3.work-title Business Cards in paper clip
                            .work-descr Marketing
        // section.module-small.bg-dark
            .container
                .row
                    .col-sm-6.col-md-8.col-lg-6.col-lg-offset-2
                        .callout-text.font-alt
                            h3.callout-title Want to see more works?
                            p We are always open to interesting projects.
                    .col-sm-6.col-md-4.col-lg-2
                        .callout-btn-box
                            a.btn.btn-w.btn-round(href='portfolio_boxed_gutter_col_3.html') Lets view portfolio
        // section#alt-features.module
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Our features
                        .module-subtitle.font-serif
                            | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                .row
                    .col-sm-6.col-md-3.col-lg-3
                        .alt-features-item
                            .alt-features-icon
                                span.icon-strategy
                            h3.alt-features-title.font-alt Branding
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
                        .alt-features-item
                            .alt-features-icon
                                span.icon-tools-2
                            h3.alt-features-title.font-alt Development
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
                        .alt-features-item
                            .alt-features-icon
                                span.icon-target
                            h3.alt-features-title.font-alt Marketing
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
                        .alt-features-item
                            .alt-features-icon
                                span.icon-tools
                            h3.alt-features-title.font-alt Design
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
                    .col-md-6.col-lg-6.hidden-xs.hidden-sm
                        .alt-services-image.align-center
                            img(src='static/titan-master/assets/images/promo.png', alt='Feature Image')
                    .col-sm-6.col-md-3.col-lg-3
                        .alt-features-item
                            .alt-features-icon
                                span.icon-camera
                            h3.alt-features-title.font-alt Photography
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
                        .alt-features-item
                            .alt-features-icon
                                span.icon-mobile
                            h3.alt-features-title.font-alt Mobile
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
                        .alt-features-item
                            .alt-features-icon
                                span.icon-linegraph
                            h3.alt-features-title.font-alt Music
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
                        .alt-features-item
                            .alt-features-icon
                                span.icon-basket
                            h3.alt-features-title.font-alt Shop
                            | A wonderful serenity has taken possession of my entire soul like these sweet mornings.
        // hr.divider-w
        // section#team.module
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Meet Our Team
                        .module-subtitle.font-serif
                            | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                .row
                    .mb-sm-20.wow.fadeInUp.col-sm-6.col-md-3(onclick='wow fadeInUp')
                        .team-item
                            .team-image
                                img(src='static/titan-master/assets/images/team-1.jpg', alt='Member Photo')
                                .team-detail
                                    h5.font-alt Hi all
                                    p.font-serif Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus,
                                    .team-social
                                        a(href='#')
                                            i.fa.fa-facebook
                                        a(href='#')
                                            i.fa.fa-twitter
                                        a(href='#')
                                            i.fa.fa-dribbble
                                        a(href='#')
                                            i.fa.fa-skype
                            .team-descr.font-alt
                                .team-name Jim Stone
                                .team-role Art Director
                    .mb-sm-20.wow.fadeInUp.col-sm-6.col-md-3(onclick='wow fadeInUp')
                        .team-item
                            .team-image
                                img(src='static/titan-master/assets/images/team-2.jpg', alt='Member Photo')
                                .team-detail
                                    h5.font-alt Good day
                                    p.font-serif Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus,
                                    .team-social
                                        a(href='#')
                                            i.fa.fa-facebook
                                        a(href='#')
                                            i.fa.fa-twitter
                                        a(href='#')
                                            i.fa.fa-dribbble
                                        a(href='#')
                                            i.fa.fa-skype
                            .team-descr.font-alt
                                .team-name Andy River
                                .team-role Creative director
                    .mb-sm-20.wow.fadeInUp.col-sm-6.col-md-3(onclick='wow fadeInUp')
                        .team-item
                            .team-image
                                img(src='static/titan-master/assets/images/team-3.jpg', alt='Member Photo')
                                .team-detail
                                    h5.font-alt Hello
                                    p.font-serif Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus,
                                    .team-social
                                        a(href='#')
                                            i.fa.fa-facebook
                                        a(href='#')
                                            i.fa.fa-twitter
                                        a(href='#')
                                            i.fa.fa-dribbble
                                        a(href='#')
                                            i.fa.fa-skype
                            .team-descr.font-alt
                                .team-name Adele Snow
                                .team-role Account manager
                    .mb-sm-20.wow.fadeInUp.col-sm-6.col-md-3(onclick='wow fadeInUp')
                        .team-item
                            .team-image
                                img(src='static/titan-master/assets/images/team-4.jpg', alt='Member Photo')
                                .team-detail
                                    h5.font-alt Yes, it's me
                                    p.font-serif Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus,
                                    .team-social
                                        a(href='#')
                                            i.fa.fa-facebook
                                        a(href='#')
                                            i.fa.fa-twitter
                                        a(href='#')
                                            i.fa.fa-dribbble
                                        a(href='#')
                                            i.fa.fa-skype
                            .team-descr.font-alt
                                .team-name Dylan Woods
                                .team-role Developer
        // section.module.bg-dark-60(data-background='static/titan-master/assets/images/section-3.jpg')
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Scoreboard
                        .module-subtitle.font-serif
                .row.multi-columns-row
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-wallet
                            h3.count-to.font-alt(data-countto='6543')
                            h5.count-title.font-serif Dollars raised for charity
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-wine
                            h3.count-to.font-alt(data-countto='8')
                            h5.count-title.font-serif Cups of wine consumed
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-camera
                            h3.count-to.font-alt(data-countto='184')
                            h5.count-title.font-serif Photographs taken
                    .col-sm-6.col-md-3.col-lg-3
                        .count-item.mb-sm-40
                            .count-icon
                                span.icon-map-pin
                            h3.count-to.font-alt(data-countto='32')
                            h5.count-title.font-serif Locations covered
        // section#pricing.module
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Our Prices
                        .module-subtitle.font-serif
                            | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                .row.multi-columns-row
                    .col-sm-6.col-md-3.col-lg-3
                        .price-table.font-alt
                            h4 Light
                            .borderline
                            p.price
                                span $
                                | 9
                            ul.price-details
                                li Free Support
                                li 15 Demos Included
                                li
                                    span Newsletter
                                li
                                    span Working Contact Form
                                li
                                    span Unlimited Domains
                            a.btn.btn-d.btn-round(href='#') Sign Up
                    .col-sm-6.col-md-3.col-lg-3
                        .price-table.font-alt
                            h4 Basic
                            .borderline
                            p.price
                                span $
                                | 29
                            ul.price-details
                                li Free Support
                                li 15 Demos Included
                                li Newsletter
                                li
                                    span Working Contact Form
                                li
                                    span Unlimited Domains
                            a.btn.btn-d.btn-round(href='#') Sign Up
                    .col-sm-6.col-md-3.col-lg-3
                        .price-table.font-alt.best
                            h4 Advanced
                            p.small Best Choice
                            .borderline
                            p.price
                                span $
                                | 64
                            ul.price-details
                                li Free Support
                                li 15 Demos Included
                                li Newsletter
                                li Working Contact Form
                                li
                                    span Unlimited Domains
                            a.btn.btn-d.btn-round(href='#') Sign Up
                    .col-sm-6.col-md-3.col-lg-3
                        .price-table.font-alt
                            h4 Ultimate
                            .borderline
                            p.price
                                span $
                                | 119
                            ul.price-details
                                li Free Support
                                li 15 Demos Included
                                li Newsletter
                                li Working Contact Form
                                li Unlimited Domains
                            a.btn.btn-d.btn-round(href='#') Sign Up
                .row.mt-40
                    .col-sm-6.col-sm-offset-3.align-center
                        p
                            | Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words.
        // section.module.bg-dark-60.pt-0.pb-0.parallax-bg.testimonial(data-background='static/titan-master/assets/images/testimonial_bg.jpg')
            .testimonials-slider.pt-140.pb-140
                ul.slides
                    li
                        .container
                            .row
                                .col-sm-12
                                    .module-icon
                                        span.icon-quote
                            .row
                                .col-sm-8.col-sm-offset-2
                                    blockquote.testimonial-text.font-alt
                                        | I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
                            .row
                                .col-sm-4.col-sm-offset-4
                                    .testimonial-author
                                        .testimonial-caption.font-alt
                                            .testimonial-title Jack Woods
                                            .testimonial-descr SomeCompany INC, CEO
                    li
                        .container
                            .row
                                .col-sm-12
                                    .module-icon
                                        span.icon-quote
                            .row
                                .col-sm-8.col-sm-offset-2
                                    blockquote.testimonial-text.font-alt
                                        | I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.
                            .row
                                .col-sm-4.col-sm-offset-4
                                    .testimonial-author
                                        .testimonial-caption.font-alt
                                            .testimonial-title Jim Stone
                                            .testimonial-descr SomeCompany INC, CEO
                    li
                        .container
                            .row
                                .col-sm-12
                                    .module-icon
                                        span.icon-quote
                            .row
                                .col-sm-8.col-sm-offset-2
                                    blockquote.testimonial-text.font-alt
                                        | I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
                            .row
                                .col-sm-4.col-sm-offset-4
                                    .testimonial-author
                                        .testimonial-caption.font-alt
                                            .testimonial-title Adele Snow
                                            .testimonial-descr SomeCompany INC, CEO
        // section#news.module
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Latest blog posts
                        .module-subtitle.font-serif
                            | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                .row.multi-columns-row.post-columns
                    .col-sm-6.col-md-4.col-lg-4
                        .post.mb-20
                            .post-thumbnail
                                a(href='#')
                                    img(src='static/titan-master/assets/images/post-1.jpg', alt='Blog-post Thumbnail')
                            .post-header.font-alt
                                h2.post-title
                                    a(href='#') Our trip to the Alps
                                .post-meta
                                    | By
                                    a(href='#') Mark Stone
                                        | 23 November | 3 Comments
                            .post-entry
                                p
                                    | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                            .post-more
                                a.more-link(href='#') Read more
                    .col-sm-6.col-md-4.col-lg-4
                        .post.mb-20
                            .post-thumbnail
                                a(href='#')
                                    img(src='static/titan-master/assets/images/post-2.jpg', alt='Blog-post Thumbnail')
                            .post-header.font-alt
                                h2.post-title
                                    a(href='#') Shore after the tide
                                .post-meta
                                    | By
                                    a(href='#') Andy River
                                        | 11 November | 4 Comments
                            .post-entry
                                p
                                    | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                            .post-more
                                a.more-link(href='#') Read more
                    .col-sm-6.col-md-4.col-lg-4
                        .post.mb-20
                            .post-thumbnail
                                a(href='#')
                                    img(src='static/titan-master/assets/images/post-3.jpg', alt='Blog-post Thumbnail')
                            .post-header.font-alt
                                h2.post-title
                                    a(href='#') We in New Zealand
                                .post-meta
                                    | By
                                    a(href='#') Dylan Woods
                                        | 5 November | 15 Comments
                            .post-entry
                                p
                                    | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                            .post-more
                                a.more-link(href='#') Read more
        // .module-small.bg-dark
            .container
                .row
                    .col-sm-6.col-md-6.col-lg-4.col-lg-offset-2
                        .callout-text.font-alt
                            h3.callout-title Subscribe now
                            p We will not spam your email.
                    .col-sm-6.col-md-6.col-lg-4
                        .callout-btn-box
                            form#subscription-form(role='form', method='post', action='php/subscribe.php')
                                .input-group
                                    input#semail.form-control(type='email', name='semail', placeholder='Your Email', data-validation-required-message='Please enter your email address.', required='required')
                                    span.input-group-btn
                                        button#subscription-form-submit.btn.btn-g.btn-round(type='submit') Submit
                            #subscription-response.text-center
        <contact/>
        section.text-center
            .module-title.font-alt
                | Download the App
            a(target="_blank" href="https://play.google.com/store/apps/details?id=com.svanq&hl=en_IN")
                img.w-100-px.mb-100(:src="staticImageUrl('play_store.png')")
        // section#map-section
            #map
        // .module-small.bg-dark
            .container
                .row
                    .col-sm-3
                        .widget
                            h5.widget-title.font-alt About {{siteName}}
                            p
                                | The languages only differ in their grammar, their pronunciation and their most common words.
                            p Phone: +1 234 567 89 10
                            | Fax: +1 234 567 89 10
                            p
                                | Email:
                                a(href='#') somecompany@example.com
                    .col-sm-3
                        .widget
                            h5.widget-title.font-alt Recent Comments
                            ul.icon-list
                                li
                                    | Maria on
                                    a(href='#') Designer Desk Essentials
                                li
                                    | John on
                                    a(href='#') Realistic Business Card Mockup
                                li
                                    | Andy on
                                    a(href='#') Eco bag Mockup
                                li
                                    | Jack on
                                    a(href='#') Bottle Mockup
                                li
                                    | Mark on
                                    a(href='#') Our trip to the Alps
                    .col-sm-3
                        .widget
                            h5.widget-title.font-alt Blog Categories
                            ul.icon-list
                                li
                                    a(href='#') Photography - 7
                                li
                                    a(href='#') Web Design - 3
                                li
                                    a(href='#') Illustration - 12
                                li
                                    a(href='#') Marketing - 1
                                li
                                    a(href='#') Wordpress - 16
                    .col-sm-3
                        .widget
                            h5.widget-title.font-alt Popular Posts
                            ul.widget-posts
                                li.clearfix
                                    .widget-posts-image
                                        a(href='#')
                                            img(src='static/titan-master/assets/images/rp-1.jpg', alt='Post Thumbnail')
                                    .widget-posts-body
                                        .widget-posts-title
                                            a(href='#') Designer Desk Essentials
                                        .widget-posts-meta 23 january
                                li.clearfix
                                    .widget-posts-image
                                        a(href='#')
                                            img(src='static/titan-master/assets/images/rp-2.jpg', alt='Post Thumbnail')
                                    .widget-posts-body
                                        .widget-posts-title
                                            a(href='#') Realistic Business Card Mockup
                                        .widget-posts-meta 15 February
        hr.divider-d
</template>
<script>
import mixin from '../../globals/mixin'
import Contact from './contact'
import * as constants from '@/constants'
import Preloader from '../../components/preloader'
import Service from './service'
import auth from '@/auth/helpers'

export default {
  name: 'Landing',
  service: new Service(),
  metaInfo () {
    return {
      title: this.getPageTitle(constants.SITE_SLOGAN)
    }
  },
  components: {
    Contact,
    Preloader
  },
  mixins: [mixin],
  data () {
    return {
      slogan: constants.SITE_SLOGAN,
      siteIntro: {
        enable: true,
        timeout: 6000,
        animationOn: false
      },
      loader: true,
      ques: 'Show us what is too common these days?',
      postsPage: 1,
      posts: [],
      currentPostIndex: 0,
      currentPost: {
        title: '',
        videoPath: '',
        id: '',
        type: ''
      },
      videoPlayerId: 'hp-video-player',
      postsThreshold: 3,
      noMorePosts: false
    }
  },
  mounted () {
    this.scrollToTop()
    this.siteIntroInit()
    this.getPosts()
  },
  methods: {
    getPosts () {
      if (this.noMorePosts) {
        return true
      }
      this.$options.service.getPublicFeed(this.postsPage)
        .then((d) => {
          this.loader = false
          if (d.posts.length) {
            this.posts = this.posts.concat(this.removeDuplicates(this.posts, d.posts))
            this.postsPage++
          } else {
            this.noMorePosts = true
          }
        })
    },
    videoPlayed () {
      auth.markEntityAsViewed(this.currentPost.id, this.currentPost.type, auth.getGuestId())
    },
    playHomeVideo () {
      /* eslint-disable */
      document.getElementById('home=page-video').play()
    },
    siteIntroInit () {
      let hideIntro = () => {
        setTimeout(() => {
          this.siteIntro.enable = false
          this.textAnimationEffect()
          this.initVideoPlayerEvents()
        }, 2000)
      }
      setTimeout(() => {
        let t = setInterval (() => {
          if (!this.loader) {
            clearInterval(t)
            this.updateCurrentPostObj()
            this.siteIntro.animationOn = true
            hideIntro()
          }
        }, 500)
      }, this.siteIntro.timeout)
    },
    initVideoPlayerEvents () {
      let t = setInterval(() => {
        let player = document.getElementById(this.videoPlayerId)
        if (player) {
          clearInterval(t)
          player.onplay = () => {
            this.videoPlayed()
          }
          player.onended = () => {
            this.getNextPost()
            this.updateCurrentPostObj()
            this.textAnimationEffect()
          }
        }
      }, 50)
    },
    textAnimationEffect () {
      let i = 0
      let txt = this.currentPost.title
      let speed = 50
      this.currentPost.title = ''
      let main  = () => {
        if (i < txt.length) {
          this.currentPost.title += txt.charAt(i)
          i++
          setTimeout(main, speed)
        }
      }
      main()
    },
    getCurrentPost () {
      return this.posts[this.currentPostIndex]
    },
    updateCurrentPostObj () {
      let p = this.getCurrentPost()
      let c = this.getPostVideoPath(p)
      if (c) {
        this.currentPost.title = this.getPostTitle(p)
        this.currentPost.videoPath = c
        this.currentPost.id = this.getDefaultVideoComment(p).id
        this.type = 'comment'
      } else {
        this.getNextPost()
        this.updateCurrentPostObj()
        this.currentPost.id = p.id
        this.type = 'post'
      }
    },
    getPostVideoPath (p) {
      if (p.type === 'video') {
        return this.getVideoURL(p.Video)
      } else if (p.type === 'question') {
        let c = this.getDefaultVideoComment(p)
        return c ? this.getVideoURL(c) : false
      }
      return false
    },
    getDefaultVideoComment (p) {
      let comments = p.Comments
      comments.sort((a, b) => {
        return a.CommentsLikesCount - b.CommentsLikesCount
      })
      for (let i = (comments.length - 1); i >= 0; i--) {
        if (comments[i].videoPath && !comments[i].disableOnMainFeed) {
          return comments[i]
        }
      }
      return false
    },
    getNextPost () {
      this.currentPostIndex++
      this.getCurrentPost()
      if (this.currentPostIndex >= (this.posts.length - this.postsThreshold)) {
        this.getPosts()
      }
      if (this.currentPostIndex >= this.posts.length) {
        this.currentPostIndex = 0
      }
    }
  }
}
</script>
<style>
.home-section {
  background-image: url('/static/titan-master/assets/images/section-10.jpg') !important
}
</style>
