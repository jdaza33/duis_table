
export default async (abuse) => {

     const axios = require('axios')
     const token = `?_token=${process.env.VUE_APP_API_KEY_OPENTOK}`

     let data = null
     let code = null


     let reportAbuse = async (abuse) => {
          let code = null

          await axios
          .post(`${process.env.VUE_APP_API_TWO_URL}/api/claim${token}`, abuse)
          .then(res => {
               if (res.data.code == 200) {
                    code = 'S003'
               }
          })
          .catch(err => {
               console.log(err)
               code = 'E006'
          })

          return code
     }

     code = await reportAbuse(abuse)

     return {
          data,
          code
     }
}