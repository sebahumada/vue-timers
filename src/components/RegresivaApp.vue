<template>
  <div :key="id" class="flex-grow-1">      
            <h2>{{ Number(nro) + 1}} - Regresiva: {{inicio}}s. </h2>      
            
            
            <template v-if="regresiva>0">

              <h4>{{regresiva}}</h4>
            </template>
            <template v-else>
              <h4>Finalizado {{fechaFin}}</h4>
            </template>

           
                       <template v-if="regresiva>0">                          
                          <button type="button" :class="`${cont.clase}warning me-1`"  @click="handlePausa" >
                            {{textoBoton}}
                          </button>
                       </template>

                       
            
            <button type="button" :class="`${cont.clase}danger`" @click="borrar(id)">
                Borrar
            </button>
        </div>
</template>

<script>
import { ref } from "vue"
import { useCounterStore } from "../stores/counter.js"

export default {
  props:{
        nro:{
            typeof: Number,
            required: true
        },
        id:{
            typeof: Number,
            required: true
        },
        inicio:{
          typeof: Number,
          required: true
        }
  },

  setup(props){
    
    const regresiva = ref(props.inicio)
    const textoBoton = ref('Pausar')
    const pausa = ref(false)

    const fechaFin = ref('')

    const cont = useCounterStore()


    const borrar = (numero)=>{
            cont.borrarContador(numero)
        }

    const setRegresiva = ()=>{

      setInterval(() => {

        if(!pausa.value){
          if(regresiva.value>0){
            regresiva.value = regresiva.value -1
            fechaFin.value = new Date(Date.now()).toLocaleDateString()+' '+new Date(Date.now()).toLocaleTimeString()
          } 

        }
        
      }, 1000);

    }

    const handlePausa = ()=>{
      if(!pausa.value){
        pausa.value = !pausa.value
        textoBoton.value = 'Reanudar'
      } else{
        pausa.value = !pausa.value
        textoBoton.value = 'Pausar'
      }
    }

    setRegresiva()

    return {
      cont,
      pausa,
      regresiva,
      fechaFin,
      textoBoton,        
      handlePausa,
      borrar
    }



  }
}
</script>

<style>

</style>