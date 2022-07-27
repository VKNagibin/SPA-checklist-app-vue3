import NoteList from "@/components/MainPage.vue";
import SingleNote from "@/components/EditNotePage.vue";
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: NoteList },
    { path: '/note', component: NoteList },
    { path: '/note/:noteId', component: SingleNote },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    routes,
    history: createWebHistory(),

});

export default router;