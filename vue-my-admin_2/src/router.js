import {createWebHistory, createRouter} from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/test",
        name: "test",
        component: () => import("./components/Test")
    }, 
    {
        path: "/admin",
        name: "admin",
        component: () => import("./components/Admin")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;