<template>
    <header>
        <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container">
                <a href="#" class="navbar-brand d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2"
                        viewBox="0 0 24 24">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                    <strong>AdminPage</strong>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
                    aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
    </header>

    <main>
        <!-- <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Services and Prices</h1>
                    <p class="lead text-muted">At Doctor Today we offer a wide range of medical services,
                        the most frequently requested of which fall into the following categories.
                        Please click a category name to skip directly to detailed service and pricing information.</p>
                    <p>
                        <button onclick="addNewNode()" class="btn btn-primary my-2">Add New Service</button>
                    </p>
                </div>
            </div>
        </section> -->

        <div class="row py-lg-4 bg-light">
            <div class="col-lg-6 col-md-8 mx-auto">
                <a href="/admin" class="btn btn-primary">ADD NEW SERVICE</a>
            </div>
        </div>

        <div class="album py-5 bg-light">
            <div class="container">

                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div v-for="serviceInfo in servicesInfo" :key="serviceInfo.serviceName" class="col">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ serviceInfo.serviceName }}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Including</h6>
                                <p></p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">{{ serviceInfo.description_1 }}</li>
                                    <li class="list-group-item">{{ serviceInfo.description_2 }}</li>
                                    <li class="list-group-item">{{ serviceInfo.description_3 }}</li>
                                </ul>
                                <button 
                                    class="btn btn-primary">Delete Service</button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </main>

    <footer class="text-muted py-5">
        <div class="container">
            <p class="float-end mb-1">
                <a href="#">Back to top</a>
            </p>
            <p class="mb-1">Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
            <p class="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a
                    href="../getting-started/introduction/">getting started guide</a>.</p>
        </div>
    </footer>


</template>

<script>
import DataService from '../dataRoutes/DataService';
export default {
    data() {
        return {
            servicesInfo: ""
        }
    },
    mounted() {
        DataService.get()
            .then(response => {
                console.log(response.data);
                this.servicesInfo = response.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        // deleteService(serviceId) {
        //     var data = {
        //         service_cat_id: serviceId
        //     };
        //     DataService.deleteService(data)
        //         .then(res => {
        //             console.log(res.data);
        //             //this.submitted = true;
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // },
    }

}
</script>
