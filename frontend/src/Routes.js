import Maincontent from './views/maincontent/Maincontent'
import Allpost from './views/allpost/Allpost'
import Onepost from './views/onepost/Onepost'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'


export default [
    {path: '/', component: Maincontent},
    {path: '/posts', component: Allpost},
    {path: '/post/:id', component: Onepost},
    {path: '/signup', component: Signup},
    {path: '/login', component: Login},
]