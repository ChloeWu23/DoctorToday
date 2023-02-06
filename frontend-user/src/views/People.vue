<template>
    <div class ="grid_12">
		<ul id="people">
            <li v-for="(item,index) in peopleList" :key="item.id">
				<p src="" style="float: left; width: 100px; margin-right: 20px; margin-bottom: 20px;"> Space for Image </p>
                    <div sytle="float:left;">
                        <p class="text-xl m-1">{{item.name}}</p>
					    <p class="text-sm font-bold">{{item.title}}</p>
					    <p class="text-sm italic m-3">{{item.profile}}</p>
		 			    <p class="text-sm mb-4" style="margin-left: 120px;">{{item.description}}</p>
		 			</div>
		 		<div style="clear: both"></div>
			</li>
        </ul>
    </div>
</template>

<script>
import DataPeople from '../dataRoutes/DataPeople'

export default {
    data () {
        return {
            peopleList: []
        }
    },
    mounted() {
        DataPeople.get()
        .then(res => {
            this.peopleList = res.data;
        })
        .catch(err => {
            console.log("Error: cannot retrieve people data");
        })
    }
}
</script>