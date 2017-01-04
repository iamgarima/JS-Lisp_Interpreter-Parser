var operators = ['+', '-', '*', '/']
var keywords = ['if', 'define', 'begin', 'set!', 'lambda', 'quote']
var inp
function parse (input, arr) {
  if (input.startsWith('(')) {
    inp = parse(input.slice(1), [])
    if (inp[0].slice(1) === "") {
      return inp[1]
    }
    arr = arr.concat([inp[1]])
    return parse(inp[0].slice(1), arr)
  }
  if (input.startsWith(')')) {
    return [input, arr]
  }
  var input1
  input1 = factory_parser(input).pop()
  return parse(input1[1], arr.concat(input1[0]))
}

function factory_parser (input) {
  var fnArr = [number_parser(input), opertor_parser(input), keyword_parser(input), space_parser(input)]
  return fnArr.filter(function arrtype (value) {
    return (typeof value === 'object')
  })
}

function number_parser (input) {
  return (!isNaN(Number(input[0]))) ? [input[0], input.slice(1)] : false
}

function opertor_parser (input) {
  return (operators.indexOf(input[0]) !== -1) ? [input[0], input.slice(1)] : false
}

function keyword_parser (input) {
  return (keywords.indexOf(input[0]) !== -1) ? [input[0], input.slice(1)] : false
}

function space_parser (input) {
  return (input[0] === ' ') ? [[], input.slice(1)] : false
}

console.log(parse('(+ (+ 3 4 (+ 7 8) 9 6) 2)', []))
