<template>
  <v-container>

    <v-flex xs12>
      <v-text-field label="Gallery URL" v-model.trim.lazy="appURL" single-line required></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-text-field label="Gallery Key" v-model.trim.lazy="appKey" single-line type="password" required></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-text-field label="Gallery Secret" v-model.trim.lazy="appSecret" single-line type="password" required></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-btn color="primary" @click.native="getWorkflows">Login</v-btn>
    </v-flex>
    <!-- <p v-if="error">Error</p> -->
    <v-alert :value="error" type="error" outline>
      Login Error - Please Provide Correct Login Details
    </v-alert>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      error: false
    }
  },
  methods: {
getWorkflows(value) {
  if(this.appURL === "" || !this.appKey || !this.appSecret){
    console.log(this.appURL)
    this.error = true
  } else {
    this.$store.state.stepper = 2;
    this.error = false;
    this.$store.getters.alteryxGallery.getSubscriptionWorkflows((w) => {
    this.workflowDetails = w
  })
  }
}
  },
  computed:
  {
    appURL: {
      get() {
        return this.$store.state.form.alteryxurl;
      },
      set(value) {
        this.$store.commit('updateURL', value);
      },
    },
    appKey: {
      get() {
        return this.$store.state.form.alteryxkey;
      },
      set(value) {
        this.$store.commit('updateKey', value);
      },
    },
    appSecret: {
      get() {
        return this.$store.state.form.alteryxsecret;
      },
      set(value) {
        this.$store.commit('updateSecret', value);
      },
    },
    workflowDetails: {
      get() {
        return this.$store.state.appdata.workflows;
      },
      set(value){
        this.$store.commit('setWorkflowdetails', value)
      }
    }
}

}
</script>

<style>
</style>
