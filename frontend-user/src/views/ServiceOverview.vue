<template>
    <div class="w-full"></div>
    <div class="m-10 min-w-fit max-w-sm md:max-w-lg">
        <p>At Doctor Today we offer a wide range of medical services, the most frequently requested of which fall into
            the following categories.</p>
        <p>Please click a category name to skip directly to detailed service and pricing information</p>
    </div>
    <div>TODO: replace static bg img link with shortname/path value in service object returned from GET</div>
    <div class="m-10 grid gap-10 md:grid-cols-3 divide-x grid-auto-flow: column">
        <div v-for="service in fullServices">
            <div
                class="bg-[url('assets/gpconsultations.png')] bg-sky-100 bg-no-repeat bg-right-bottom rounded border-sky-700 p-4 drop-shadow-md h-full">
                <RouterLink :to="'services/' + service.serviceName.replace(/\s+/g, '-').toLowerCase()">
                    <p class="font-bold text-sky-600">
                        {{ service.serviceName }}
                    </p>
                    <p class="my-2">include:</p>
                    <span>
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