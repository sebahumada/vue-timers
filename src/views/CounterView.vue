<template>

    <div>
        <div v-if="error" :class="`alert alert-danger ${cont.alerta} animate__animated animate__bounceInLeft`" role="alert">
            Máximo 5 items
        </div>

        <button type="button" :class="`${cont.clase}info`" @click="setOscuroClaro">{{ cont.texto}}</button>
        <h1>Timers</h1>
        <h5>{{fecha}}</h5>

        
        

        
        <button type="button" :class="`${cont.clase}success me-1 mt-1`" @click="agregaContador">Agregar Timer</button>
        
        <button type="button" :class="`${cont.clase}danger me-1 mt-1`" @click="agregarRegresiva">Agregar Cuenta Regresiva</button>
        
        <button type="button" :class="`${cont.clase}primary me-1 mt-1`" @click="resetear">Resetear</button>
        <br />
        <hr />

        <div className="d-flex flex-column">
            <template v-for="(c, index) in cont.contadores" :key="c.id">
                
                <template v-if="c.tipo === 'TIMER'">
                    <ContadoresApp :nro="index" :id="c.id" />
                </template>
                <template v-else>
                    <RegresivaApp inicio="10" :nro="index" :id="c.id" />
                </template>

            </template>
        </div>

    </div>

  
</template>

<script>

import ContadoresApp from '@/components/ContadoresApp.vue'
import RegresivaApp from '@/components/RegresivaApp.vue'
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'




export default {
    components:{ContadoresApp, RegresivaApp },
    setup() {
        const cont = useCounterStore()
        const error = ref(false)
        
        const fecha = ref(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        

        const showError = ()=>{

                error.value = true

                setTimeout(() => {
                    error.value = false
                }, 3000);      
        }

        const agregaContador = ()=>{
            
            if(cont.contadores.length === 5){
                showError()     
                
            } else {
                cont.clickContador({
                    id:new Date().getTime(),
                    tipo: 'TIMER'
                })
            }

        }
        const agregarRegresiva = ()=>{
            
            if(cont.contadores.length === 5){     
                                   
                showError()
                
            }

            cont.clickContador({
                id:new Date().getTime(),
                tipo: 'REGRESIVA'
            })
        }

        const resetear = ()=>{
            cont.resetear()
        }

        const fechaActual = ()=>{
            setInterval(() => {                
                fecha.value = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
            }, 500)
        }

        const setOscuroClaro = ()=>{
            cont.setOscuro()            
        }

        fechaActual()
        


        return {
            cont,
            error,
            agregaContador,
            agregarRegresiva,
            resetear,
            setOscuroClaro,
            fecha
        }
    },
}
</script>
