import { createRouter, createWebHistory } from 'vue-router';

import Create from './components/AddProduct.vue'
import Edit from './components/EditProduct.vue'
import Index from './components/ProductList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
      name: 'Create',
      path: '/create',
      component: Create
    },
    {
      name: 'Edit',
      path: '/edit/:id',
      component: Edit
    },
    {
      name: 'Index',
      path: '/',
      component: Index
    },
  ]
});
   



export default router;