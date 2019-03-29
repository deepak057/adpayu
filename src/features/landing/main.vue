<template lang="pug">
div
    section#home.home-section.home-full-height.bg-dark.bg-gradient(data-background='static/titan-master/assets/images/section-10.jpg')
        .titan-caption
            .caption-content
                .font-alt.mb-30.titan-title-size-1 Hello & welcome
                .font-alt.mb-40.titan-title-size-4 We are Titan
                a.section-scroll.btn.btn-border-w.btn-round(href='#') Learn More
    .main
        section#services.module
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Our Services
                        .module-subtitle.font-serif
                            | A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                .row.multi-columns-row
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-lightbulb
                            h3.features-title.font-alt Ideas and concepts
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-bike
                            h3.features-title.font-alt Optimised for speed
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-tools
                            h3.features-title.font-alt Designs & interfaces
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-gears
                            h3.features-title.font-alt Highly customizable
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-tools-2
                            h3.features-title.font-alt Coding & development
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-genius
                            h3.features-title.font-alt Features & plugins
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-mobile
                            h3.features-title.font-alt Responsive design
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
                    .col-md-3.col-sm-6.col-xs-12
                        .features-item
                            .features-icon
                                span.icon-lifesaver
                            h3.features-title.font-alt Dedicated support
                            p
                                | Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.
        section.module.bg-dark-60(data-background='static/titan-master/assets/images/section-6.jpg')
            .container
                .row
                    .col-sm-12
                        .video-box
                            .video-box-icon
                                a.video-pop-up(href='https://www.youtube.com/watch?v=TTxZj3DZiIM')
                                    span.icon-video
                            .video-title.font-alt Presentation
                            .video-subtitle.font-alt Watch the video about our new products
        section#works.module.pb-0
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
        section.module-small.bg-dark
            .container
                .row
                    .col-sm-6.col-md-8.col-lg-6.col-lg-offset-2
                        .callout-text.font-alt
                            h3.callout-title Want to see more works?
                            p We are always open to interesting projects.
                    .col-sm-6.col-md-4.col-lg-2
                        .callout-btn-box
                            a.btn.btn-w.btn-round(href='portfolio_boxed_gutter_col_3.html') Lets view portfolio
        section#alt-features.module
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
        hr.divider-w
        section#team.module
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
        section.module.bg-dark-60(data-background='static/titan-master/assets/images/section-3.jpg')
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
        section#pricing.module
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
        section.module.bg-dark-60.pt-0.pb-0.parallax-bg.testimonial(data-background='static/titan-master/assets/images/testimonial_bg.jpg')
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
        section#news.module
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
        .module-small.bg-dark
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
        section#contact.module
            .container
                .row
                    .col-sm-6.col-sm-offset-3
                        h2.module-title.font-alt Get in touch
                        .module-subtitle.font-serif
                .row
                    .col-sm-6.col-sm-offset-3
                        form#contactForm(role='form', method='post', action='php/contact.php')
                            .form-group
                                label.sr-only(for='name') Name
                                input#name.form-control(type='text', name='name', placeholder='Your Name*', required='required', data-validation-required-message='Please enter your name.')
                                p.help-block.text-danger
                            .form-group
                                label.sr-only(for='email') Email
                                input#email.form-control(type='email', name='email', placeholder='Your Email*', required='required', data-validation-required-message='Please enter your email address.')
                                p.help-block.text-danger
                            .form-group
                                textarea#message.form-control(rows='7', name='message', placeholder='Your Message*', required='required', data-validation-required-message='Please enter your message.')
                                p.help-block.text-danger
                            .text-center
                                button#cfsubmit.btn.btn-block.btn-round.btn-d(type='submit') Submit
                        #contactFormResponse.ajax-response.font-alt
        section#map-section
            #map
        .module-small.bg-dark
            .container
                .row
                    .col-sm-3
                        .widget
                            h5.widget-title.font-alt About Titan
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
export default {
  name: 'Landing'
}
</script>
