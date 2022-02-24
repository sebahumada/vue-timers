<template>
    <!-- <div class="greetings">
    <h1 class="green">{{ Number(segundos).toFixed(2) }}</h1>
    <h3 class="green">{{ pausa }}</h3>
    <button @click="setPausa">Pausar</button> -->



    <!-- <div :key={id} class="flex-grow-1">       -->
        <div class="flex-grow-1">    
            <!-- <h2>{nro+1} - Timer</h2>       -->
            <h2>{{ Number(nro) + 1}}- Timer</h2>      
            <h4>{{tiempo}}</h4>
            
            <button type="button" :class="`${cont.clase}warning me-1`" @click="setPausa" >
                {{textoBoton}}
            </button>
            
            <button type="button" :class="`${cont.clase}danger`" @click="borrar(idCont)" >
                Borrar
            </button>
        </div>
    
  
</template>

<script>
import { ref } from 'vue'
import { calcularTiempo } from '../helpers/tiempo'
import { useCounterStore } from '../stores/counter.js'

export default {

    props:{
        nro:{
            typeof: Number,
            required: true
        },
        id:{
            typeof: Number,
            required: true
        }
    },
    setup(props){
        
        const pausa = ref(false)
        const segundos = ref(0)
        const tiempo = ref('')
        const decimales = ref('')
        const textoBoton = ref('Pausar')

        const cont = useCounterStore()

        const setSegundos = ()=>  {setInterval(() => {
            if(!pausa.value){
                segundos.value = segundos.value + 0.01
                decimales.value =  Number(segundos.value).toFixed(2).split('.')[1];
                tiempo.value = calcularTiempo(Number(segundos.value).toFixed(2)).concat('.'+decimales.value);
            }
        }, 10)}

        const borrar = (numero)=>{
            cont.borrarContador(numero)
        }

        const setPausa = ()=>{
            if(!pausa.value){
                pausa.value = !pausa.value
                textoBoton.value = 'Reanudar'
            } else{
                pausa.value = !pausa.value
                textoBoton.value = 'Pausar'
            }
        }

        setSegundos()

        return {
            cont,
            idCont: props.id,            
            pausa,
            textoBoton,
            tiempo,
            setPausa,
            borrar
            
        }
    }

}
</script>
