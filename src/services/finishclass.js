
export default async (finish) => {

     const axios = require('axios')
     const token = `?_token=${process.env.VUE_APP_API_KEY_OPENTOK}`

     let data = null
     let code = null


     let finishClass = async (finish) => {
          let code = null

          await axios
          .post(`${process.env.VUE_APP_API_TWO_URL}/api/finishsession${token}`, finish)
          .then(res => {
               if (res.data.code > 200 && res.data.code < 300) {
                    code = 'S004'
               }
          })
          .catch(err => {
               console.log(err)
               code = 'E007'
          })

          return code
     }

     let deleteClass = async (id) => {
          //let code = null

          await axios
               .delete(`${process.env.VUE_APP_API_URL}/class/${id}`, finish)
               .then(res => {
                    if (res.data.res) {
                         //code = 'I003'
                    }
               })
               .catch(err => {
                    console.log(err)
                    //code = 'E008'
               })

          //return code
     }

     code = await finishClass(finish.data)
     await deleteClass(finish.id)


     return {
          data,
          code
     }
}