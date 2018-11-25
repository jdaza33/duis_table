
export default async (room, op) => {

     const axios = require('axios');

     let data = null;
     let code = null;

     let postClass = async (room) => {
          let code = null
          let data = null

          await axios
          .post(`${process.env.VUE_APP_API_URL}/class/new`, room)
          .then(res => {
               if (res.data.res) {
                    code = 'S002'
               }
          })
          .catch(err => {
               console.log(err)
               code = 'E005'
          })

          return {code, data}
     }

     let getUserByChatkit = async (userId) => {
          let response = null

          await axios
               .get(`${process.env.VUE_APP_API_URL}/user/${userId}`)
               .then(res => {
                    response = res.data.res
               })
               .catch(err => {
                    console.log(err)
               })

          return response
     }

     let createUserByChatkit = async (userId, name) => {
          let response = null

          await axios
               .post(`${process.env.VUE_APP_API_URL}/user/create`, {
                    id: userId,
                    name
               })
               .then(res => {
                    response = res.data.res
               })
               .catch(err => {
                    console.log(err)
               })

          return response
     }

     let createRoomByChatkit = async (userId, name) => {
          let response = null
          let roomId = null

          await axios
               .post(`${process.env.VUE_APP_API_URL}/room/new`, {
                    userId,
                    name
               })
               .then(res => {
                    response = res.data.res
                    roomId = res.data.roomId
               })
               .catch(err => {
                    console.log(err)
               })

          return {response, roomId}
     }

     let addUserRoomByChatkit = async (userId, roomId) => {
          let code = null

          await axios
               .post(`${process.env.VUE_APP_API_URL}/room/add/users`, {
                    userId,
                    roomId
               })
               .then(res => {
                    if (res.data.res){
                         code = 'I005'
                    }
               })
               .catch(err => {
                    console.log(err)
                    code = 'E010'
               })

          return code
     }

     if (op == 'postClass') {
          let isUserChatkit = await getUserByChatkit(room.teacher_id)
          if(isUserChatkit){
               let createRoomChatkit = await createRoomByChatkit(room.teacher_id, `Clase - ${room.name}`)
               if(createRoomChatkit.response){
                    room.roomIdChatkit = createRoomChatkit.roomId
                    let temp = await postClass(room);
                    data = temp.data;
                    code = temp.code;
               }
          }else{
               let createUserChatkit = await createUserByChatkit(room.teacher_id, room.teacher_name)
               if (createUserChatkit){
                    let createRoomChatkit = await createRoomByChatkit(room.teacher_id, `Clase - ${room.name}`)
                    if (createRoomChatkit.response) {
                         room.roomIdChatkit = createRoomChatkit.roomId
                         let temp = await postClass(room);
                         data = temp.data;
                         code = temp.code;
                    }
               }
          }
          
     }

     if (op == 'addUserChatkit'){
          let isUserChatkit = await getUserByChatkit(room.userId)
          if (isUserChatkit) {
               let temp = await addUserRoomByChatkit(room.userId, room.id)
               code =temp

          } else {
               let createUserChatkit = await createUserByChatkit(room.userId, room.userName)
               if (createUserChatkit) {
                    let temp = await addUserRoomByChatkit(room.userId, room.id)
                    code = temp
               }
          }
     }

     return {
          data,
          code
     }
}