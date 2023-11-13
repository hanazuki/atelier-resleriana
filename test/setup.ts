import { beforeAll, afterAll, afterEach, expect } from 'vitest'
import * as matchers from 'jest-extended'
expect.extend(matchers)

// testing-library-react expects the test runner to expose there hooks on global object
global['beforeAll'] = beforeAll
global['afterAll'] = afterAll
global['afterEach'] = afterEach

beforeAll(() => {
  delete global['beforeAll']
  delete global['afterAll']
  delete global['afterEach']
})
