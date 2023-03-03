<template>
    <div class="container justify-between w-screen min-w-full block lg:flex lg:grid-cols-2 text-white text-xs lg:my-0 bg-sky-700">
        <div class="justify-self-start items-left mx-6">
            <p>Fast track independent health care services for individuals, families and companies</p>
            <p>© {{ year() }} Doctor Today Ltd. All rights reserved. The Doctor Today logo is a registered UK
                trademark. E.
                & O.E.</p>
        </div>
        <div class="lg:justify-self-end lg:text-right mx-6">
            <p><a href="">Registered by the Care Quality Commission</a></p>
            <!-- links to be added -->
            <p><a href="">Site Developers</a> |
                <a href="">Terms and Conditions</a> |
                <a href="">Privacy Policy</a>
            </p>

        </div>
    </div>
</template>


<script>
export default {
    methods:
    {//function to auto update the logo statement at the bottom of the page
        year() {
            let d = new Date();
            return d.getFullYear();
        }
    }
}
</script>
