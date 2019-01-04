<template>
  <div class="scroll-container">
    <!-- <v-btn
      color="primary"
      @click.native="configure"
    >Configure</v-btn> -->
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 2084 2084"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,2084.000000) scale(0.100000,-0.100000)"
        fill="#2691cc"
        stroke="none"
        @click.native="configure"
      >
        <path d="M10005 20550 c-602 -31 -1159 -114 -1726 -256 -1932 -484 -3649
-1626 -4848 -3224 -341 -454 -594 -866 -846 -1375 -513 -1034 -795 -2078 -885
-3270 -29 -384 -22 -981 16 -1395 218 -2377 1377 -4536 3234 -6025 1424 -1142
3129 -1796 4962 -1906 266 -16 1002 -7 1238 15 918 85 1714 273 2515 594 1313
525 2505 1384 3412 2457 1108 1312 1795 2869 2007 4555 51 402 61 571 61 1090
0 496 -6 625 -46 985 -208 1875 -1012 3619 -2305 5000 -1174 1254 -2704 2141
-4362 2530 -453 106 -895 174 -1377 210 -244 19 -818 27 -1050 15z m417 -3610
c1104 -74 2042 -348 2655 -774 l103 -71 2 -3225 3 -3225 22 -77 c27 -96 44
-129 94 -183 42 -45 124 -88 206 -106 30 -7 245 -13 577 -16 l528 -5 -5 -321
c-3 -237 -9 -346 -21 -412 -82 -453 -336 -685 -834 -760 -135 -21 -467 -20
-630 1 -236 30 -473 105 -639 202 -240 141 -438 355 -556 603 -39 82 -44 88
-72 89 -19 0 -44 -11 -65 -28 -237 -193 -573 -408 -835 -533 -554 -265 -1104
-371 -1795 -348 -663 23 -1219 205 -1625 534 -413 334 -665 817 -750 1440 -23
161 -31 580 -16 772 32 404 113 728 255 1018 110 224 229 387 407 560 177 171
333 278 584 400 427 209 960 333 1650 385 133 10 1885 80 2001 80 l54 0 0
1129 0 1128 -117 55 c-493 232 -1275 363 -1966 329 -369 -18 -655 -52 -987
-117 -297 -58 -621 -152 -794 -228 -32 -14 -60 -26 -61 -26 -5 0 -62 248 -89
385 -32 168 -71 440 -90 630 -19 192 -31 395 -22 395 3 0 90 23 194 50 578
155 1028 228 1682 273 118 9 816 6 952 -3z" />
        <path d="M10990 11765 c-1149 -56 -1313 -65 -1439 -80 -685 -85 -1018 -321
-1141 -809 -36 -143 -50 -243 -59 -436 -15 -285 13 -561 74 -741 125 -366 384
-566 840 -645 139 -25 505 -30 692 -10 613 65 1201 265 1671 568 l92 60 0
1064 0 1064 -22 -1 c-13 -1 -331 -16 -708 -34z" />
      </g>
    </svg>

    <!-- <v-spacer></v-spacer>
    <div v-if="this.$store.state.appdata.appId !== ''">
      <v-icon
        medium
        @click="configure"
        disabled
      >
        fas fa-play fa
      </v-icon>
      <v-icon
        medium
        @click="configure"
        disabled
      >
        fas fa-cog fa
      </v-icon>
  </div>-->
  </div>
</template>

<script>
export default {
  name: "Tableau",
  data() {
    return {
      popupUrl: `${
        window.location.origin
      }/run-alteryx-tableau-extension/#/configure`,
      height: 800,
      width: 800,
      text: ""
    };
  },
  methods: {
    configure: function() {
      console.log("Hii");
      tableau.extensions.ui
        .displayDialogAsync(this.popupUrl, "Payload Message", {
          height: this.height,
          width: this.width
        })
        .then(closePayload => {})
        .catch(error => {
          switch (error.errorCode) {
            case tableau.ErrorCodes.DialogClosedByUser:
              console.log("Dialog was closed by user");
              break;
            default:
              console.error(error.message);
          }
        });
    }
  },
  mounted: function() {
    tableau.extensions
      .initializeAsync({ configure: this.configure })
      .then(function() {
        tableau.extensions.settings.addEventListener(
          tableau.TableauEventType.SettingsChanged,
          settingsEvent => {
            console.log("This is for saved settings");
          }
        );
      });
  }
};
</script>

<style scoped>
.scroll-container {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  backface-visibility: hidden;
  width: 100vw;
  height: 100vh;
  background: white;
}
</style>
