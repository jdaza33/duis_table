import global from './global'

export default (component, cod) => {

     let auxType = cod.split('')[0]
     let type = auxType == 'S' ?
          { a: 'is-success', b: 'success' } :
          auxType == 'W' ?
               { a: 'is-warning', b: 'warn' } :
               auxType == 'I' ?
                    { a: 'is-info', b: 'info' } : { a: 'is-danger', b: 'error' }
     //let title = auxType == 'S' ? 'OK' : auxType == 'W' ? 'AVISO' : 'ERROR'
     let text = global[cod]

     component.$toast.open({
          duration: 3000,
          message: text,
          position: 'is-top',
          type: type.a,
          queue: false
     })
}