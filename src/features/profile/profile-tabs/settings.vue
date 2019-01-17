<template lang="pug">
.card-body
  form.form-horizontal.form-material(@submit.prevent='updateProfile()')
    h4 Basic Details
      br
      small.text-muted More information you provide, more relevant ads you'll see
    .form-group.m-t-20(:class="{'has-danger': nameError}")
      label.col-md-12(for='up-user-name-field')
        | Full Name
        i.mdi.mdi-earth.text-muted.m-l-5(title="Full name is publicly visible")
      .col-md-12
        input#up-user-name-field.form-control.form-control-line(placeholder='Enter Name' type='text' v-model.trim="name" autocomplete="off")
        small.form-control-feedback(v-show="nameError")
          | {{nameError}}
    .form-group(:class="{'has-danger': taglineError}")
      label.col-md-12
        | Tagline
        i.mdi.mdi-earth.text-muted.m-l-5(title="Tagline is publicly visible")
      .col-md-12
        input.form-control.form-control-line(type="text" v-model.trim="user.tagline" placeholder="Enter your tagline")
        small.form-control-feedback(v-show="taglineError")
          | {{taglineError}}
    .form-group
      label.col-sm-12
        | Gender
        i.mdi.mdi-lock.text-muted.m-l-5(title="No one can see your gender")
      .col-sm-12
        select.form-control.form-control-line(v-model="user.gender")
          option(value="" selected disabled hidden) Choose here
          option(value="male") Male
          option(value="female") Female
          option(value="other") Other
    .form-group
      label.col-sm-12
        | Select Country
        i.mdi.mdi-lock.text-muted.m-l-5(title="No one can see your country")
      .col-sm-12
        select.form-control.form-control-line(v-model="user.location")
          option(value="" selected disabled hidden) Choose here
          option(value='AF') Afghanistan
          option(value='AX') Åland Islands
          option(value='AL') Albania
          option(value='DZ') Algeria
          option(value='AS') American Samoa
          option(value='AD') Andorra
          option(value='AO') Angola
          option(value='AI') Anguilla
          option(value='AQ') Antarctica
          option(value='AG') Antigua and Barbuda
          option(value='AR') Argentina
          option(value='AM') Armenia
          option(value='AW') Aruba
          option(value='AU') Australia
          option(value='AT') Austria
          option(value='AZ') Azerbaijan
          option(value='BS') Bahamas
          option(value='BH') Bahrain
          option(value='BD') Bangladesh
          option(value='BB') Barbados
          option(value='BY') Belarus
          option(value='BE') Belgium
          option(value='BZ') Belize
          option(value='BJ') Benin
          option(value='BM') Bermuda
          option(value='BT') Bhutan
          option(value='BO') Bolivia, Plurinational State of
          option(value='BQ') Bonaire, Sint Eustatius and Saba
          option(value='BA') Bosnia and Herzegovina
          option(value='BW') Botswana
          option(value='BV') Bouvet Island
          option(value='BR') Brazil
          option(value='IO') British Indian Ocean Territory
          option(value='BN') Brunei Darussalam
          option(value='BG') Bulgaria
          option(value='BF') Burkina Faso
          option(value='BI') Burundi
          option(value='KH') Cambodia
          option(value='CM') Cameroon
          option(value='CA') Canada
          option(value='CV') Cape Verde
          option(value='KY') Cayman Islands
          option(value='CF') Central African Republic
          option(value='TD') Chad
          option(value='CL') Chile
          option(value='CN') China
          option(value='CX') Christmas Island
          option(value='CC') Cocos (Keeling) Islands
          option(value='CO') Colombia
          option(value='KM') Comoros
          option(value='CG') Congo
          option(value='CD') Congo, the Democratic Republic of the
          option(value='CK') Cook Islands
          option(value='CR') Costa Rica
          option(value='CI') Côte d'Ivoire
          option(value='HR') Croatia
          option(value='CU') Cuba
          option(value='CW') Curaçao
          option(value='CY') Cyprus
          option(value='CZ') Czech Republic
          option(value='DK') Denmark
          option(value='DJ') Djibouti
          option(value='DM') Dominica
          option(value='DO') Dominican Republic
          option(value='EC') Ecuador
          option(value='EG') Egypt
          option(value='SV') El Salvador
          option(value='GQ') Equatorial Guinea
          option(value='ER') Eritrea
          option(value='EE') Estonia
          option(value='ET') Ethiopia
          option(value='FK') Falkland Islands (Malvinas)
          option(value='FO') Faroe Islands
          option(value='FJ') Fiji
          option(value='FI') Finland
          option(value='FR') France
          option(value='GF') French Guiana
          option(value='PF') French Polynesia
          option(value='TF') French Southern Territories
          option(value='GA') Gabon
          option(value='GM') Gambia
          option(value='GE') Georgia
          option(value='DE') Germany
          option(value='GH') Ghana
          option(value='GI') Gibraltar
          option(value='GR') Greece
          option(value='GL') Greenland
          option(value='GD') Grenada
          option(value='GP') Guadeloupe
          option(value='GU') Guam
          option(value='GT') Guatemala
          option(value='GG') Guernsey
          option(value='GN') Guinea
          option(value='GW') Guinea-Bissau
          option(value='GY') Guyana
          option(value='HT') Haiti
          option(value='HM') Heard Island and McDonald Islands
          option(value='VA') Holy See (Vatican City State)
          option(value='HN') Honduras
          option(value='HK') Hong Kong
          option(value='HU') Hungary
          option(value='IS') Iceland
          option(value='IN') India
          option(value='ID') Indonesia
          option(value='IR') Iran, Islamic Republic of
          option(value='IQ') Iraq
          option(value='IE') Ireland
          option(value='IM') Isle of Man
          option(value='IL') Israel
          option(value='IT') Italy
          option(value='JM') Jamaica
          option(value='JP') Japan
          option(value='JE') Jersey
          option(value='JO') Jordan
          option(value='KZ') Kazakhstan
          option(value='KE') Kenya
          option(value='KI') Kiribati
          option(value='KP') Korea, Democratic People's Republic of
          option(value='KR') Korea, Republic of
          option(value='KW') Kuwait
          option(value='KG') Kyrgyzstan
          option(value='LA') Lao People's Democratic Republic
          option(value='LV') Latvia
          option(value='LB') Lebanon
          option(value='LS') Lesotho
          option(value='LR') Liberia
          option(value='LY') Libya
          option(value='LI') Liechtenstein
          option(value='LT') Lithuania
          option(value='LU') Luxembourg
          option(value='MO') Macao
          option(value='MK') Macedonia, the former Yugoslav Republic of
          option(value='MG') Madagascar
          option(value='MW') Malawi
          option(value='MY') Malaysia
          option(value='MV') Maldives
          option(value='ML') Mali
          option(value='MT') Malta
          option(value='MH') Marshall Islands
          option(value='MQ') Martinique
          option(value='MR') Mauritania
          option(value='MU') Mauritius
          option(value='YT') Mayotte
          option(value='MX') Mexico
          option(value='FM') Micronesia, Federated States of
          option(value='MD') Moldova, Republic of
          option(value='MC') Monaco
          option(value='MN') Mongolia
          option(value='ME') Montenegro
          option(value='MS') Montserrat
          option(value='MA') Morocco
          option(value='MZ') Mozambique
          option(value='MM') Myanmar
          option(value='NA') Namibia
          option(value='NR') Nauru
          option(value='NP') Nepal
          option(value='NL') Netherlands
          option(value='NC') New Caledonia
          option(value='NZ') New Zealand
          option(value='NI') Nicaragua
          option(value='NE') Niger
          option(value='NG') Nigeria
          option(value='NU') Niue
          option(value='NF') Norfolk Island
          option(value='MP') Northern Mariana Islands
          option(value='NO') Norway
          option(value='OM') Oman
          option(value='PK') Pakistan
          option(value='PW') Palau
          option(value='PS') Palestinian Territory, Occupied
          option(value='PA') Panama
          option(value='PG') Papua New Guinea
          option(value='PY') Paraguay
          option(value='PE') Peru
          option(value='PH') Philippines
          option(value='PN') Pitcairn
          option(value='PL') Poland
          option(value='PT') Portugal
          option(value='PR') Puerto Rico
          option(value='QA') Qatar
          option(value='RE') Réunion
          option(value='RO') Romania
          option(value='RU') Russian Federation
          option(value='RW') Rwanda
          option(value='BL') Saint Barthélemy
          option(value='SH') Saint Helena, Ascension and Tristan da Cunha
          option(value='KN') Saint Kitts and Nevis
          option(value='LC') Saint Lucia
          option(value='MF') Saint Martin (French part)
          option(value='PM') Saint Pierre and Miquelon
          option(value='VC') Saint Vincent and the Grenadines
          option(value='WS') Samoa
          option(value='SM') San Marino
          option(value='ST') Sao Tome and Principe
          option(value='SA') Saudi Arabia
          option(value='SN') Senegal
          option(value='RS') Serbia
          option(value='SC') Seychelles
          option(value='SL') Sierra Leone
          option(value='SG') Singapore
          option(value='SX') Sint Maarten (Dutch part)
          option(value='SK') Slovakia
          option(value='SI') Slovenia
          option(value='SB') Solomon Islands
          option(value='SO') Somalia
          option(value='ZA') South Africa
          option(value='GS') South Georgia and the South Sandwich Islands
          option(value='SS') South Sudan
          option(value='ES') Spain
          option(value='LK') Sri Lanka
          option(value='SD') Sudan
          option(value='SR') Suriname
          option(value='SJ') Svalbard and Jan Mayen
          option(value='SZ') Swaziland
          option(value='SE') Sweden
          option(value='CH') Switzerland
          option(value='SY') Syrian Arab Republic
          option(value='TW') Taiwan, Province of China
          option(value='TJ') Tajikistan
          option(value='TZ') Tanzania, United Republic of
          option(value='TH') Thailand
          option(value='TL') Timor-Leste
          option(value='TG') Togo
          option(value='TK') Tokelau
          option(value='TO') Tonga
          option(value='TT') Trinidad and Tobago
          option(value='TN') Tunisia
          option(value='TR') Turkey
          option(value='TM') Turkmenistan
          option(value='TC') Turks and Caicos Islands
          option(value='TV') Tuvalu
          option(value='UG') Uganda
          option(value='UA') Ukraine
          option(value='AE') United Arab Emirates
          option(value='GB') United Kingdom
          option(value='US') United States
          option(value='UM') United States Minor Outlying Islands
          option(value='UY') Uruguay
          option(value='UZ') Uzbekistan
          option(value='VU') Vanuatu
          option(value='VE') Venezuela, Bolivarian Republic of
          option(value='VN') Viet Nam
          option(value='VG') Virgin Islands, British
          option(value='VI') Virgin Islands, U.S.
          option(value='WF') Wallis and Futuna
          option(value='EH') Western Sahara
          option(value='YE') Yemen
          option(value='ZM') Zambia
          option(value='ZW') Zimbabwe
    h4 Security
    .form-group.m-t-20
      label.col-md-12(for='up-user-email')
        | Email
        i.mdi.mdi-lock.text-muted.m-l-5(title="No one can see your email")
      .col-md-12
        input#up-user-email.form-control.form-control-line(placeholder='Enter email', type='email' v-model = "user.email" readonly autocomplete="off")
    .form-group(:class="{'has-danger': passwordError}")
      label.col-md-12
        | New Password
        i.mdi.mdi-lock.text-muted.m-l-5(title="Only you know your password")
      .col-md-12
        input.form-control.form-control-line(type='password' placeholder="Enter new password" v-model="newPassword")
        small.form-control-feedback(v-show="passwordError")
          | {{passwordError}}
    .form-group
      .col-sm-12
        button.btn.btn-success Update Profile
</template>
<script>
import mixin from '../../../globals/mixin.js'
import userRegistrationMixin from '../../../globals/user-register'
import auth from '@/auth/helpers'

// import Preloader from './../../../components/preloader'
import Service from './service'

export default {
  name: 'Settings',
  service: new Service(),
  components: {},
  mixins: [mixin, userRegistrationMixin],
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: Object.assign({}, this.currentUser),
      name: this.userName(this.currentUser),
      nameError: false,
      taglineError: false,
      maxTaglineChars: 100,
      newPassword: '',
      passwordError: false
    }
  },
  watch: {
    '$store.state.auth.user' (user) {
      this.user = user
    }
  },
  methods: {
    updateProfile () {
      if (this.nameValidate() && this.validateTagLine() && this.passwordVaildate()) {
        this.showNotification('Saving profile, please wait....', 'warn', -1)
        auth.updateCurrentUser(this.getUserObject())
          .then((data) => {
            this.showNotification('Profile updated successfully', 'success')
            this.reset()
          })
          .catch((errUser) => {
            this.showNotification('Something went wrong, please try again', 'error')
          })
      }
    },
    // get updated properties of
    // User object after successfull validation
    getUserObject () {
      let t = this.name.split(' ')
      this.user.first = t[0]
      this.user.last = t[1]
      this.user.newPassword = this.newPassword
      return this.user
    },
    nameValidate () {
      if (!this.validateName(this.name)) {
        this.nameError = 'Please enter your full name'
        return false
      } else {
        this.nameError = false
        return true
      }
    },
    validateTagLine () {
      if (!this.user.tagline || (this.user.tagline && this.user.tagline.length < this.maxTaglineChars)) {
        this.taglineError = false
        return true
      } else {
        this.taglineError = 'Max ' + this.maxTaglineChars + ' chars allowed. You have entered ' + this.user.tagline.length
        return false
      }
    },
    passwordVaildate () {
      if (!this.newPassword || (this.newPassword && this.validatePassword(this.newPassword))) {
        this.passwordError = false
        return true
      } else {
        this.passwordError = 'Please enter a valid password'
        return false
      }
    },
    showNotification (content, classType, duration = 3000) {
      this.$notify({
        group: 'appNotifications',
        clean: true
      })
      this.$notify({
        group: 'appNotifications',
        title: '',
        text: content,
        type: classType,
        duration: duration
      })
    },
    reset () {
      this.newPassword = ''
    }
  }
}
</script>
