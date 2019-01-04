<template>
    <v-flex>
        <div v-for="appQuestion in this.$store.state.appdata.appQuestions" :key="appQuestion.name" v-if="appQuestion.type === 'QuestionNumericUpDown'">
            <v-flex xs12 md3>
                <v-text-field v-model="value" type="number" :value="value" :label="appQuestion.description"></v-text-field>
            </v-flex>
        </div>
    </v-flex>
</template>

<script>
export default {
data: () => ({
      value: 50
    })
}
</script>

<style>
</style>
