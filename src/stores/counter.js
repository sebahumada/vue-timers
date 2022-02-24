import { defineStore } from 'pinia'


export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    contadores: [],
    oscuro: false,
    clase: 'btn btn-',
    texto: 'Activa Oscuro',
    alerta: ''
  }),
  getters: {
    
  },
  actions: {
    clickContador(payload) {
      if(this.contadores.length < 5){        
        this.contadores = [...this.contadores, payload]
      }
    },
    borrarContador(num){      
      
      this.contadores = this.contadores.filter(n=> n.id !== num)
    },
    resetear(){
      this.contadores = []
    },
    setOscuro(){
      this.oscuro = !this.oscuro
      if(this.oscuro){
        this.clase = 'btn btn-outline-'
        this.texto = 'Activa Claro'
        this.alerta = 'bg-black text-danger border-danger'
        document.querySelector('body').className ='container mt-4 bg-black text-info'
        
      } else {
        this.clase = 'btn btn-'
        this.texto = 'Activa Oscuro'
        this.alerta = ''
        document.querySelector('body').className='container mt-4'
      }
    }
  }
  
})
