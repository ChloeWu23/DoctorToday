<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>This page no longer exists or was moved to another location.</p>
    {{ text }}
    <TextEditor @editorUpdated="updateContent" class="w-96 h-60"/>
    <SearchBox />
    <SembleButton/>
      <div>
        <p>
       Test: Click on the address below to open it in a map application:
      <br>
      <button>open in google map:
        <a :href="map1Url" target="_blank" rel="noopener noreferrer" class = "text-red-500">{{ address }}</a>
      </button>
      <br>
      <button>
        open in Apple map:
        <a :href="mapUrl" target="_blank" rel="noopener noreferrer" class = "text-red-500">{{ address }}</a>
      </button>   
    </p>
  </div>   

  </div>
  
</template>


<script>
export default {
  data(){
    return {
      text: "To be updated upon clicking 'save'; ",
      address: '182 Finchley Rd, London, UK',
      latitude: '51.5499794',
      longitude: '-0.1841192'
    }
  },
  methods:{
    updateContent(html) {
      console.log("parent triggered");
      this.text = html;
    }
  },
  computed: {
        mapUrl() {
        
        const iosUrl = `maps://?ll=${this.latitude},${this.longitude}&q=${encodeURIComponent(this.address)}`;
        const androidUrl = `geo:${this.latitude},${this.longitude}?q=${encodeURIComponent(this.address)}`;
        const fallbackUrl = `https://maps.apple.com/?address=${encodeURIComponent(this.address)}&ll=${this.latitude},${this.longitude}`;

        const device = useDevice();

        if (device.isMacOS ||device.isIos ||device.isApple ) {
            return `${iosUrl}`;
        } else {
          return `${fallbackUrl}`;
        }     
    },

    map1Url() {
        
        const iosUrl = `comgooglemaps://?ll=${this.latitude},${this.longitude}&q=${encodeURIComponent(this.address)}`;
        const androidUrl = `comgooglemaps://?ll=${this.latitude},${this.longitude}?q=${encodeURIComponent(this.address)}`;
        const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.address)}`;
        const device = useDevice();
        if (device.isIos) {
            return `${iosUrl}`;
        } else if(device.isAndroid){
            return `${androidUrl}`;
        } else {
          return `${fallbackUrl}`;
        }
      }
    }
}
</script>
