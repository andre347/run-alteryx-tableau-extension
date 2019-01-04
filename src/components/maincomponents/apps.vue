<template>
    <div id="workflows">
        <div v-if="this.$store.state.appdata.workflows.length > 0">
            <p>Select your Alteryx Workflow/App</p>
            <v-flex xs8 offset-xs2>
                <select name="workflows" id="workflows" v-model="setAppId">
                    <option value="">Select an app...</option>
                    <option v-for="(workflow, index) in this.$store.state.appdata.workflows" :key="`workflow-${index}`" :value="workflow.id">{{ workflow.metaInfo.name }}</option>
                </select>
            </v-flex>
            <br>
            <v-flex xs12>
                <v-btn color="primary" @click="getAppInfo">Get App Interface</v-btn>
                <v-btn flat @click.native="backStep">Cancel</v-btn>
            </v-flex>
        </div>
        <p v-else-if="this.$store.state.appdata.workflows.length = 0">There are no workflows for these API Keys</p>
    </div>
</template>

<script>
export default {
methods: {
    getAppInfo() {
        this.$store.state.stepper = 3;
        console.log(this.$store.state.appdata.appId)
          this.$store.getters.alteryxGallery.getAppQuestions(this.$store.state.appdata.appId,(q) => {
           // console.log(q)
            this.setAppQuestions = q;
            this.activateButton = true;
  })
    },
    backStep() {
        this.$store.state.stepper = 1;
        console.log('Hello')
    }
},
computed: {
    setAppId: {
    get() {
        return this.$store.state.appdata.appId;
      },
      set(value) {
        this.$store.commit('updateAppId', value);
      },
    },
    setAppQuestions: {
        get() {
            return this.$store.state.appdata.appQuestions;
        },
        set(value){
            this.$store.commit('updateAppQuestions', value)
        }
    },
    activateButton: {
        get() {
            return this.$store.state.appdata.runButton;
        },
        set(value) {
            this.$store.commit('updateRunButton', value)
        }
    },
    workflowName: {
        get() {
            let data = [];
            this.$store.state.appdata.workflows.forEach((e) => {
               data.push(e)
            })
            return data;
        }
    },
    workflowID: {
        get() {
            let dataID = [];
            this.$store.state.appdata.workflows.forEach((e) => {
                dataID.push(e.id)
            })
            return dataID;
        }
    }
}

}
</script>

<style scoped>
select {
  border-bottom: 1px solid grey;
  border-bottom-right-radius: 0%;
  border-bottom-left-radius: 0%;
}
.select-items {
  background-color: white;
}
</style>
