<template>
    <div class ="grid_12">
		<ul id="people">
            <li v-for="(item,index) in peopleList" :key="item.id">
				<p style="float: left; width: 100px; margin-right: 20px; margin-bottom: 20px;"> Space for Image</p>
                    <div sytle="float:left;">
                        <h3>{{item.name}}</h3>
					    <p><strong>{{item.title}}</strong></p>
					    <p class="italic">{{item.profile}}</p>
		 			    <p style="margin-left: 120px;">{{item.description}}</p>
		 			</div>
		 		<div style="clear: both"></div>
			</li>
        </ul>
    </div>
</template>

<script>
import DataPeople from '@/dataRoutes/DataPeople'

export default {
    data () {
        return {
            peopleList: [
                {name: "name1", title: "title1", profile: "profile1", description: "description1"},
                {name: "name2", title: "title2", profile: "profile2", description: "description2"}
            ]
        }
    },
    mounted() {
        DataPeople.get().then(rec => {
            console.log(res.data);
            peopleList = res.data;
        })
        .catch(err => {
            console.log("Error: cannot retrieve people data");
        })
    }
}
</script>