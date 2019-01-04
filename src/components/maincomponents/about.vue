<template>
    <v-card>
        <v-card-text>
            <v-flex xs12>
                <p class="text-md-center headline font-weight-light">Created by
                    <span class="text-md-center headline font-weight-regular">Andre de Vries</span>
                </p>
                <div class="subheading text-xs-center grey--text pt-1 pb-3">The Information Lab UK</div>
                <v-spacer></v-spacer>
                <p>{{ information }}</p>
                <div offset-md2>

                    <a href="http://twitter.com/andre347_" target="blank" style="text-decoration: none">
                        <v-icon offset-md2>fab fa-twitter</v-icon>
                    </a>

                    <a href="https://github.com/andre347" target="blank" style="text-decoration: none">
                        <v-icon>fab fa-github</v-icon>
                    </a>
                    <a href="https://theinformationlab.co.uk" target="blank" style="text-decoration: none">
                        <v-icon>fas fa-globe</v-icon>
                    </a>
                </div>

            </v-flex>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            information: "The 'Alteryx in Tableau' extension is provided free of charge as a tool to benefit the Tableau & Alteryx community. I will provide no support for its use other than associated online resources, and bug fixes. If you wish to provide feedback, feature requests, or just say 'thanks!' please contact with me on Twitter, or send me an e-mail at andre.devries@theinformationlab.co.uk",

        }
    }

}
</script>

<style scoped>
.aboutLink:hover {
  background-color: black;
}
</style>
