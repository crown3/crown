function Echo(...args) {
  if (args.length === 1) {
    console.log('no intro', args[0])
    return args[0]
  }

  if (args.length === 2) {
    console.log(args[0], args[1])
    return args[1]
  }
}

export default {
  Echo
}
