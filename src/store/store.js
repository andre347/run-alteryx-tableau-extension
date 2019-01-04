import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    stepper: 0,
    form: {
      alteryxurl: "",
      alteryxkey: "",
      alteryxsecret: ""
    },
    appdata: {
      number: -1,
      workflows: [],
      appId: "",
      appQuestions: [],
      appValues: "",
      checked: "",
      runButton: false
    },
    workflowOutput: {},
    tableauData: {}
  },
  mutations: {
    updateURL(state, value) {
      state.form.alteryxurl = value;
    },
    updateKey(state, value) {
      state.form.alteryxkey = value;
    },
    updateSecret(state, value) {
      state.form.alteryxsecret = value;
    },
    setWorkflowdetails(state, value) {
      value.forEach(e => {
        state.appdata.workflows.push(e);
      });
    },
    updateAppId(state, value) {
      state.appdata.appId = value;
    },
    updateAppQuestions(state, value) {
      state.appdata.appQuestions = value;
    },
    updateAppValues(state, value) {
      state.appdata.appValues = value;
    },
    updateChecked(state, value) {
      state.appdata.checked = value;
    },
    updateRunButton(state, value) {
      state.appdata.runButton = value;
    },
    updateWorkflowOutput(state, value) {
      state.workflowOutput = value;
    },
    setStepper(state, value) {
      state.stepper = value;
    },
    setStepperId(state, value) {
      value = 3;
      state.stepper = value;
    },
    setTableauData: (state, value) => {
      state.tableauData = value;
    }
  },
  getters: {
    alteryxGallery: state => {
      const gallery = new Gallery(
        state.form.alteryxurl,
        state.form.alteryxkey,
        state.form.alteryxsecret
      );
      console.log("Connection Succesfull");
      console.log(gallery);
      return gallery;
    },
    getTableau: state => {
      return state.tableauData;
    }
  }
});
