const fs = require('fs')

function get_async() {
  let data = fs.readFileSync('./async_wait.txt', 'utf8');
  console.log(data)
  return data
}

async function main() {
  console.log('0')
  get_async()
  console.log('1')
}

main()