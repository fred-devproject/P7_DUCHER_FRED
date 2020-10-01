import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      userId: '',
      email: '',
      token: null,
      isadmin: false
    },
    editedMsg: ""
  },

  mutations: {
    // on sauvegarde les infos des user dans les champs
    saveUserInfos(state, [username, userId, email, isadmin]) {
          state.user.username = username,
          state.user.userId = userId,
          state.user.email = email,
          state.user.token = localStorage.getItem("token");
          state.user.isadmin = isadmin
    },

    
    editMessage(state, value) {
      state.editedMsg = value
    }
  },

  actions: {
    // requête pour modifier les données de l'user
    getUserInfos(context) {      
        axios
          .get("http://localhost:3000/api/users/profil", {
            // on verifie si l'user à une autorisation : TOKEN valide ...
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })                  
          .then(response => {
            context.commit('saveUserInfos',[response.data.username, response.data.id, response.data.email, response.data.isadmin])
          })
          .catch(error => {
            console.log('Erreur auth', error);
          });        
    },
  
    changeEditMessage(context, value){
      context.commit('editMessage',value)
    }
    
  },
  modules: {
  }
})
