<template>
    <v-flex xs12 md3>
        <div v-for="appQuestion in this.$store.state.appdata.appQuestions" :key="appQuestion.name" v-if="appQuestion.type === 'QuestionDate'">
            <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="date" :label="appQuestion.description" prepend-icon="event" readonly></v-text-field>
                <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="disPlayDate">OK</v-btn>
                </v-date-picker>
            </v-menu>

        </div>
    </v-flex>
</template>

<script>
export default {
 data: () => ({
      date: null,
      menu: false
    }),
methods: {
    disPlayDate(){
        console.log(this.date)
    }
}
}
</script>

<style>
</style>
