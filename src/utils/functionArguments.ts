export const parameterNames = (func: Function) => {
  const funcStr = func.toString()
  const paramRegex = /\(([^)]*)\)/
  const match = paramRegex.exec(funcStr)
  return match ? match[1].split(",").map((param) => param.trim()) : []
}
