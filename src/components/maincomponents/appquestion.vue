<template>
    <div>
        <p>{{ appMessage }}</p>
        <!-- TEXT BOX -->
        <div v-for="appQuestion in this.$store.state.appdata.appQuestions" :key="appQuestion.name" v-if="appQuestion.type === 'QuestionTextBox'" ref="dropdown" :data-description="appQuestion.description" @input="getValues" :title="appQuestion.name">
            <v-spacer></v-spacer>
            <v-flex xs12 md3>
                <v-text-field :label="appQuestion.description" :placeholder="appQuestion.name" :title="appQuestion.name"></v-text-field>
            </v-flex>
        </div>

        <!-- SELECT DROPDOWN -->
        <v-flex xs12>
            <div v-for="appQuestion in this.$store.state.appdata.appQuestions" :key="appQuestion.name" v-if="appQuestion.type === 'QuestionListBox'" ref="dropdown" :data-description="appQuestion.description">
                <v-flex xs12 sm6 md3>
                    <p class="text-sm-left">{{ appQuestion.description }} ({{ appQuestion.name }})</p>
                    <select id="appQuestionList" @input="getValues" v-bind:title="appQuestion.name">
                        <option :value="null">Select a value...</option>
                        <option ref="option" v-for="(item, index) in appQuestion.items" :key="index" :value='item.value'>{{ item.value }}</option>
                    </select>
                </v-flex>
            </div>
        </v-flex>

        <!-- BOOLEAN SELECT -->
        <v-flex xs12 md3>
            <div v-for="appQuestion in this.$store.state.appdata.appQuestions " :key="appQuestion.name " v-if="appQuestion.type==='QuestionBooleanGroup' ">
                <p class="text-sm-left ">{{ appQuestion.description }} ({{ appQuestion.name }})</p>
                <input type="checkbox " id="checkbox " v-model="checkedValue ">
                <label for="checkbox ">{{ appQuestion.value }}</label>
            </div>
        </v-flex>

        <!-- Datepicker -->
        <app-date></app-date>

        <!-- NumbericUpDown -->
        <app-number></app-number>

        <v-btn color="primary " @click="runWorkflow "> {{ this.$store.state.appdata.appQuestions.length > 0 ? 'Run App' : 'Run Workflow' }}</v-btn>
        <v-btn color="primary " @click="saveSettings ">Save Settings</v-btn>
        <v-btn v-if="refreshBtn" color="success " @click="refreshDataSource ">Refresh Data</v-btn>
        <p v-if="runMsg">{{ runMsg }}</p>
        <p>{{ workflowInfo }}</p>
        <p v-if="refreshDatasourceInfo">{{ refreshDatasourceInfo }}</p>
    </div>
</template>

<script>
import datepicker from '../alteryxcomponents/datepicker.vue'
import numericupdown from '../alteryxcomponents/numericupdown.vue'

export default {
    data() {
        return {
    selectedItems: '',
    selectDropdown: [],
    picker: null,
    runMsg: '',
    refreshBtn: false,
    refreshDatasourceInfo: ''
        }
    },
    components: {
        appDate: datepicker,
        appNumber: numericupdown
    },
    methods: {
     getWorkflowStatus: function(jobId, gallery, callback){
        gallery.getJob(jobId, function(response) {
            callback(response);
        })
    }, checkStatus: function(jobId, gallery, callback){
        setTimeout(function() {
            gallery.getJob(jobId, function(resp){
                callback(resp)
            })
        }, 3000)
    },
      runWorkflow() {
        console.log('Running workflow...');
        this.runMsg = 'Running...'
        // create array to push object from getValues in
        let dataArray = []
        // if workflow then create empty object, else push getValues in arr
        if(this.$store.state.appdata.appQuestions.length === 0){
            dataArray = {}
         }
        else {
        dataArray.push(this.selectedItems)
        }

        console.log(dataArray);


            this.$store.getters.alteryxGallery.executeWorkflow(this.$store.state.appdata.appId,dataArray,(e) => {
                this.$store.getters.alteryxGallery.getJob(e.id, (resp) => {
                    let jobId = resp.id
                    // log the jobId of the workflow
                    console.log(jobId)
                    this.checkStatus(jobId, this.$store.getters.alteryxGallery, (resp)=>{
                        console.log(resp)
                        this.runMsg = ''
                        this.workflowOutput = resp;
                        this.refreshBtn = true
                    })
                })
            })
        },
        getValues(e) {
            console.log(e)
            let title = e.target.title;
            let value = e.target.value;
            let arr = []
            let object = {
                name: title,
                value: value
            }

            this.selectedItems = object

            // this.selectedItems = []

            // let data = e.target.options[e.target.options.selectedIndex].value
            // this.selectedItems.push(data)
            // console.log(this.selectedItems)



            // if(e.target.options.selectedIndex > 0) {
            //     let arr = []
            //     let data = e.target.options[e.target.options.selectedIndex].value
            //     this.selectedItems.push(data)

            //     arr = this.selectedItems.filter(value =>
            //     this.$delete(arr, data)
            //     )

            // console.log(arr, this.selectedItems)
            // }
        },
        saveSettings() {
            // console.log(tableau.extensions)
            // tableau.extensions.settings.set('appId', JSON.stringify(this.$store.state.appdata.appId))
            // console.log(tableau.extensions.settings.getAll());


        },
        refreshDataSource() {
            const dashboard = tableau.extensions.dashboardContent.dashboard;
            const sheets = dashboard.worksheets[0];
            console.log(sheets.name)
            const datasource = sheets.getDataSourcesAsync();
            // refresh said data source
            console.log("Refreshing Datasource..");
            datasource.then(source => source[0].refreshAsync().then(d => {
                this.refreshDatasourceInfo =  `${source[0].name} refreshed!`
            }));
        }
    },
computed: {
    appMessage() {
      return  (this.$store.state.appdata.appQuestions.length === 0) ? 'There are no questions for this App' : ''
    },
    setappValues: {
        get(){
            return this.$store.state.appdata.appValues;
        },
        set(value) {
            this.$store.commit('updateAppValues', value)
        }
    },
    checkedValue: {
        get() {
            return this.$store.state.appdata.checked;
        },
        set(value) {
            this.$store.commit('updateChecked', value)
        }
    },
    workflowOutput: {
        get() {
            return this.$store.state.workflowOutput;
        },
        set(value) {
            this.$store.commit('updateWorkflowOutput', value)
        }
    },
    workflowInfo: {
        get() {
            if (this.$store.state.workflowOutput.status === 'Completed' && this.$store.state.workflowOutput.disposition === 'Success') {
            return  'Completed Successfully';
            } else if (this.$store.state.workflowOutput.status === 'Completed' && this.$store.state.workflowOutput.disposition === 'Error') {
              return 'Error Message';
            }
        }
    },
    getAppInterface: {
        get() {
        let object
        this.$store.state.appdata.appQuestions.forEach((data) => {
            object = data.items
            });
        return object;
        }
    }
}
}
</script>

<style scoped>
select {
  align-self: center;
  border-bottom: 1px solid grey;
  border-bottom-right-radius: 0%;
  border-bottom-left-radius: 0%;
  width: 100%;
  margin-bottom: 15px;
  margin-top: 0px;
}
.select-items {
  background-color: white;
  align-items: flex-start;
}
</style>
