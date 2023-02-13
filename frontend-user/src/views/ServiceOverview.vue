<template>
    <div class="w-full"></div>
    <div class="m-10 min-w-fit max-w-sm md:max-w-lg">
        <p>At <strong>DoctorToday</strong> we offer a wide range of medical services, the most frequently requested of which fall into
            the following categories.</p>
        <p>Please <strong>click a category name</strong> to skip directly to detailed service and pricing information</p>
    </div>
    <div>TODO: replace static bg img link with shortname/path value in service object returned from GET</div>
    <div class="m-10 grid gap-10 md:grid-cols-3 divide-x grid-auto-flow: column">
        <div v-for="service in fullServices">
            <div
                class="bg-[url('assets/gpconsultations_2.png')] bg-no-repeat bg-right-bottom bg-white rounded border-t-4 border-blueLight p-4 drop-shadow-md h-full">
                <RouterLink :to="'services/' + service.serviceName.replace(/\s+/g, '-').toLowerCase()">
                    <p class="font-bold text-blueLight mb-2">
                        {{ service.serviceName }}
                    </p>
                    <!-- <p class="my-2 text-gray-400">include:</p> -->
                    <span class="text-sm">
                        <li>{{ service.description_1 }} </li>
                        <li>{{ service.description_2 }} </li>
                        <li>{{ service.description_3 }} </li>
                    </span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from '../dataRoutes/DataService';

export default {
    data() {
        return {
            fullServices: '',
        }
    },
    mounted() {
        DataService.get()
            .then(response => {
                console.log(response.data);
                this.fullServices = response.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
}</script>