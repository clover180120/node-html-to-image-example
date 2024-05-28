<script setup>
const data = reactive({
  image: null
});

const getImage = async () => {
  try {
    const res = await $fetch('/api/image', {
      method: 'POST',
      body: {
        content: 'ha ha ha'
      },
    });
    const imageUrl = URL.createObjectURL(res)
    data.image = imageUrl;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
</script>

<template>
  <div>
    <button @click="getImage">Get Image</button>
    <img v-if="data.image" :src="data.image" alt="image" />
  </div>
</template>
