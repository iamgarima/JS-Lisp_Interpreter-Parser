var operators = ['+', '-', '*', '/', '>', '>=', '<', '<=']
var keywords = ['if', 'define', 'begin', 'set!', 'lambda', 'quote', 'sqr', 'sqrt', 'equal?', 'number?']
var next
function parse (input, arr) {
  if (input.startsWith('(')) {
    next = parse(input.slice(1), [])
    if (next[0].slice(1) === "") {
      return next[1]
    }
    arr = arr.concat([next[1]])
    return parse(next[0].slice(1), arr)
  }
  if (input.startsWith(')')) {
    return [input, arr]
  }
  var result
  result = factory_parser(input).pop()
  if (result[1] === '') {
    return arr.concat(result[0])
  }
  return parse(result[1], arr.concat(result[0]))
}

function factory_parser (input) {
  var fnArr = [number_parser(input), opertor_parser(input), keyword_parser(input), space_parser(input)]
  return fnArr.filter(function (value) {
    return (typeof value === 'object')
  })
}

function elem(p) {
  var str = ""
  var sl = p[0]
  while(sl !== " " && sl !== ')') {
    str = str + sl
    sl = p.slice(1)[0]
    p = p.slice(1)
    if (sl === undefined) {
      break;
    }
  }
  return [str, p]
}

function number_parser (input) {
  var first = elem(input)
  return (!isNaN(Number(first[0]))) ? first : false
}

function opertor_parser (input) {
  var first = elem(input)
  return (operators.indexOf(first[0]) !== -1) ? first : false
}

function keyword_parser (input) {
  var first = elem(input)
  return (typeof first[0] === 'string') ? first : false
}

function space_parser (input) {
  return (input[0] === ' ') ? [[], input.slice(1)] : false
}

 console.log(parse('(+ (+ 3 4 (<= 7 8) 9 6) 2)', []))
 console.log(parse('A', []))
 console.log(parse('(define A 5)', []))
