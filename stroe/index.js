import { defineStore } from 'pinia'
import {ref} from 'vue'
export const userchangloginStore = defineStore('changlogin', ()=>{
	const count = ref(1)
	function chooserole(){
	}
	return{count,increment}
})
