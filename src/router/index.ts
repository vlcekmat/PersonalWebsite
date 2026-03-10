import Gallery from "@/views/Gallery.vue";
import Home from "@/views/Home.vue";
import AboutView from "@/views/AboutView.vue";
import { createRouter, createWebHistory } from "vue-router";
import GuestbookView from '@/views/GuestbookView.vue'
import CodingProjectsView from "@/views/CodingProjectsView.vue";
import PixelartEditorView from "@/views/PixelartEditorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/gallery", component: Gallery },
    { path: "/codingProjects", component: CodingProjectsView },
    { path: "/about", component: AboutView },
    { path: "/pixelart", component: PixelartEditorView },
    { path: "/guestbook", component: GuestbookView }
  ],
});

export default router;
