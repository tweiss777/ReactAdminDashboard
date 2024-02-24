import { Config } from 'jest'
const config: Config = {
  modulePathIgnorePatterns: ['./dist'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  }
}
export default config
