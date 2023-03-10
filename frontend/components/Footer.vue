<template>
    <div
        class="xl:max-w-screen-xl mx-auto container justify-between block lg:flex lg:grid-cols-2 text-white text-xs lg:my-0 bg-sky-700">
        <div class="justify-self-start items-left mx-6">
            <p>Fast track independent health care services for individuals, families and companies</p>
            <p>© {{ year() }} Doctor Today Ltd. All rights reserved. The Doctor Today logo is a registered UK
                trademark. E.
                & O.E.</p>
        </div>
        <div class="lg:justify-self-end lg:text-right mx-6">
            <p><a href="https://www.cqc.org.uk/location/1-117106339?referer=widget4">Registered by the Care Quality
                    Commission</a></p>

            <p><!-- links to be added -->
                <NuxtLink to="/about/Developers">Site Developers</NuxtLink> |
                <NuxtLink to="/about/Terms">Terms and Conditions</NuxtLink> |
                <NuxtLink to="/about/FAQs">Privacy Policy</NuxtLink>
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
