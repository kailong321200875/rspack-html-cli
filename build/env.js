const fs = require('node:fs')
const path = require('node:path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

function loadEnv(mode) {
  // 获取项目根目录
  const basePath = path.resolve(__dirname, '../')

  // 加载默认环境变量
  const defaultEnvPath = path.resolve(basePath, '.env')
  const defaultEnv = fs.existsSync(defaultEnvPath)
    ? dotenv.parse(fs.readFileSync(defaultEnvPath))
    : {}

  // 加载指定环境的环境变量
  const envPath = path.resolve(basePath, `.env.${mode}`)
  const modeEnv = fs.existsSync(envPath)
    ? dotenv.parse(fs.readFileSync(envPath))
    : {}

  // 合并环境变量，非默认环境变量优先级更高
  const env = { ...defaultEnv, ...modeEnv }

  // 展开环境变量（支持使用已有环境变量）
  const expanded = dotenvExpand.expand({ parsed: env }).parsed

  // 将环境变量注入到 process.env
  Object.entries(expanded).forEach(([key, value]) => {
    process.env[key] = value
  })

  // 返回处理后的环境变量
  return expanded
}

module.exports = loadEnv
