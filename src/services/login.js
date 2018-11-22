
export default async (username, password) => {

     const axios = require('axios')
     const token = `?_token=${process.env.VUE_APP_API_KEY_OPENTOK}`


     let login = async (username, password) => {
          let code = null

          await axios
          .post(`${process.env.VUE_APP_API_TWO_URL}/api/login${token}`, {
               username, password
          })
          .then(res => {
               if (res.data.code == 200) {
                    code = 'S001'
               }

          })
          .catch(err => {
               console.log(err)
               code = 'E001'
          })

          return code
     }

     let findUser = async (username) => {
          let data = null
          let code = null

          await axios
          .get(`${process.env.VUE_APP_API_TWO_URL}/api/show_by_username/${username}${token}`)
          .then(res => {
               if(res.data.response.length > 0){
                    let temp = res.data.response[0]
                    data = {
                         name: temp.name,
                         id: temp.id,
                         role: temp.role
                    }
                    code = 'I001'
               }else{
                    code = 'E003'
               }
          })
          .catch(err => {
               console.log(err)
               code = 'E002'
          })

          return {
               data, code
          }
     }

     let data = null
     let code = null
     let user = await findUser(username)
     
     data = user.data
     if (user.code.split('')[0] == 'I'){
          code = await login(username, password)
     }else{
          code = user.code
     }

     
     return {
          data,
          code
     }
}