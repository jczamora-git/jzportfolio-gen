import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import WizardView from '@/views/WizardView.vue'
import ResultView from '@/views/ResultView.vue'
import DeployGuideView from '@/views/DeployGuideView.vue'
import PrivacyView from '@/views/PrivacyView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
      meta: { title: 'Portfolio Launchpad — AI Portfolio Prompt Builder' },
    },
    {
      path: '/builder',
      name: 'builder',
      component: WizardView,
      meta: { title: 'Builder — Portfolio Launchpad' },
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView,
      meta: { title: 'Your Prompt — Portfolio Launchpad' },
    },
    {
      path: '/learn/deploy',
      name: 'deploy-guide',
      component: DeployGuideView,
      meta: { title: 'Deployment Guide — Portfolio Launchpad' },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
      meta: { title: 'Privacy Statement — Portfolio Launchpad' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
