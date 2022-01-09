module.exports = function(api){
  api.cache(true)
  return {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ],
    env: {
      development: {
        plugins: [["inline-dotenv",{
          path: '.env.development',
          systemVar: 'overwrite',
        }]]
      }
    }
  }
}
