<template>
  <div
    class="hide-overflow"
    style="position: relative;"
  >
    <div>
      <v-tabs
        fixed-tabs
        grow
        color="grey lighten-3"
      >
        <v-tab>
          CONFIGURE
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-stepper
                v-model="setStepper"
                vertical
              >

                <v-stepper-step
                  :edit-icon="'check'"
                  :complete-icon="'edit'"
                  :step="1"
                  :complete="(1) <= setStepper"
                  :editable="(1) < setStepper"
                >Alteryx Gallery Login</v-stepper-step>

                <v-stepper-content step="1">
                  <app-login></app-login>
                </v-stepper-content>

                <v-stepper-step
                  :edit-icon="'check'"
                  :complete-icon="'edit'"
                  :step="2"
                  :complete="(2) <= setStepper"
                  :editable="(2) < setStepper"
                >Select App/Workflow</v-stepper-step>

                <v-stepper-content step="2">
                  <app-apps></app-apps>
                </v-stepper-content>

                <v-stepper-step
                  :edit-icon="'check'"
                  :complete-icon="'edit'"
                  :step="3"
                  :complete="(3) <= setStepper"
                  :editable="(3) < setStepper"
                >Configure & Run App / Workflow </v-stepper-step>

                <v-stepper-content step="3">
                  <app-question v-if="this.$store.state.appdata.runButton == true"></app-question>
                </v-stepper-content>

              </v-stepper>

            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>
          ABOUT
        </v-tab>
        <v-tab-item>
          <app-about></app-about>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import Login from "./maincomponents/login.vue";
import Apps from "./maincomponents/apps.vue";
import Question from "./maincomponents/appquestion.vue";
import About from "./maincomponents/about.vue";

export default {
  name: "Configure",
  data: function() {
    return {
      created: "Created by Andre de Vries - The Information Lab",
      msg: "Welcome to the Alteryx Extension App",
      submsg: "Put in your Alteryx Gallery Credentials",
      tableauData: {
        dashboard: "",
        sheet: "",
        datasource: ""
      }
    };
  },
  components: {
    appLogin: Login,
    appApps: Apps,
    appQuestion: Question,
    appAbout: About
  },
  methods: {
    getSavedAppId() {
      if (this.getAppId === "") {
        console.log("No App Saved");
        console.log(this.setStepper);
      } else if (this.getAppId !== "") {
        console.log("App ID Saved!");
      }
    },
    loadTableau: () => {
      tableau.extensions.initializeDialogAsync().then(openPayload => {
        let dashboard = tableau.extensions.dashboardContent.dashboard;
        let sheet = dashboard.worksheets[0];
        let dataSource = sheet.getDataSourcesAsync().then(function(source) {
          //    console.log(source[0])
        });
      });
    },
    setTableauData() {
      this.tableau.dashboard = tableau.extensions.dashboardContent.dashboard;
      this.tableau.sheet = dashboard.worksheets[0];
      return "Hello";
    }
  },
  computed: {
    setStepper: {
      get() {
        return this.$store.state.stepper;
      },
      set(value) {
        this.$store.commit("setStepper", value);
      }
    },
    setTableauDataStore: {
      get() {
        return this.$store.state.tableauData;
      },
      set(value) {
        this.$store.commit("setTableauData", value);
      }
    },
    getAppId: {
      get() {
        return this.$store.state.appdata.appId;
      }
    }
  },
  mounted() {
    this.getSavedAppId();
    this.loadTableau();
  }
};
</script>

<style>
html {
  overflow: auto;
}

a {
  color: #42b983;
}
</style>
