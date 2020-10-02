import Maincontent from './views/maincontent/Maincontent'
import Onepost from './views/onepost/Onepost'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'
import Profil from './views/profil/Profil'
import Newpost from './views/newpost/Newpost'
import Mentions from './views/mentions/Mentions'


export default [
    {path: '/', component: Maincontent},
    {path: '/post/:id', component: Onepost},
    {path: '/signup', component: Signup},
    {path: '/login', component: Login},
    {path: '/profil', component: Profil},
    {path: '/newpost', component: Newpost},
    {path: '/mentions', component: Mentions},
]