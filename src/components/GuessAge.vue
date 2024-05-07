<template>
  <h1>{{ title }}</h1>
  <div class="card">
    <div style="width:400px;height:130px;margin-top:20px;border-style: dotted;">
      <br>
      <div id="firstname">Firstmame: {{ firstname }}</div> <br>
      <span>Age: {{ age }}</span> <br>

    </div><br><br>
    <label> Enter Firstname </label><br>
    <input v-model="search" type="text" style="font-size:20px;border-radius:10px;" placeholder=" Name ..."> <br> <br>
    <button id="guess" type="button" @click="getAge">Guess Age</button>
    <br> <br> <br>
    <input type="radio" value="pop"> <label>Save my data</label>
  </div>
</template>
<script setup>
import { ref } from 'vue'
defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  }
})

const search = ref('');
const firstname = ref('');
const age = ref('');

/*
const getAge = async () => {
  await fetch('https://api.agify.io/?name=' + search.value)
    .then(response => response.json())
    .then(data => {
      age.value = data.age
      firstname.value = data.name
      search.value = ""
      console.log("#### data:", data);
    })
  //console.log('### appel de getAge firstname:', document.getElementById("firstname").innerHTML);
  //console.log('### appel de getAge firstname:', firstname.value);
}
*/
const getAge = async () => {
  const data = await fetch('https://api.agify.io/?name=' + search.value);
  const dataJSON = await data.json();
  console.log(dataJSON);
  age.value = dataJSON.age;
  firstname.value = dataJSON.name;
  search.value = "";
  console.log("### appel de getAge");
}
</script>
