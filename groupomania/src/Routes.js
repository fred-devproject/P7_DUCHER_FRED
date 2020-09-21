import Maincontent from './components/maincontent/Maincontent'
import Allpost from './components/allpost/Allpost'
import Onepost from './components/onepost/Onepost'
import Register from './components/register/Register'


export default [
    {path: '/', component: Maincontent},
    {path: '/posts', component: Allpost},
    {path: '/post/:id', component: Onepost},
    {path: '/register', component: Register},
]