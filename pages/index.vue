<template>
  <section class="section">
    <div class="columns is-mobile">
      <b-button @click="test()">Test</b-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    test() {
      const credentials = { username: '', password: '' }

      this.$auth.loginWith('graphql', credentials)

      // this.$qAuth.login(credentials).then((result) => {
      //   console.log(result)
      //   if (result.success) {
      //     this.$toast.success('Logged In!')
      //   }
      // })
    },
  },
}
</script>
