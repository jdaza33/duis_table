
export default async (user) => {

     const axios = require('axios')
     const token = `?_token=${process.env.VUE_APP_API_KEY_OPENTOK}`

     let data = null
     let code = null

     if(user.role == 'student'){
          let temp = await getClassForStudents()
          data = temp.data
          code = temp.code
     }

     if (user.role == 'teacher') {
          let temp = await getClassForTeachers(user.id)
          data = temp.data
          code = temp.code
     }

     if (user.role == 'teacher' && user.data != null) {
          let temp = await insertClass(user.data)
          code = temp
     }


     let getClassForStudents = async () => {
          let code = null
          let data = null

          await axios
               .get(`${process.env.VUE_APP_API_TWO_URL}/api/get/lessons${token}`)
               .then(res => {
                    console.log(res.data.response)
                    if (res.data.code == 200) {
                         code = 'I002'
                         data = res.data.response
                    }
               })
               .catch(err => {
                    console.log(err)
                    code = 'E004'
               })

          return {code, data}
     }

     let getClassForTeachers = async (userId) => {
          let code = null
          let data = null

          await axios
               .get(`${process.env.VUE_APP_API_TWO_URL}/api/get/get_by_teacher/lesson/${userId}${token}`)
               .then(res => {
                    console.log(res.data.response)
                    if (res.data.code == 200) {
                         code = 'I002'
                         data = res.data.response
                    }
               })
               .catch(err => {
                    console.log(err)
                    code = 'E004'
               })

          return { code, data }
     }

     let insertClass = async (data) => {
          let code = null

          await axios
               .post(`${process.env.VUE_APP_API_TWO_URL}/api/create/lesson${token}`, data)
               .then(res => {
                    if (res.data.code == 200) {
                         code = 'S002'
                    }
               })
               .catch(err => {
                    console.log(err)
                    code = 'E004'
               })

          return code
     }

     return {
          data,
          code
     }
}