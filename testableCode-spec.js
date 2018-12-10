const testableCode = require('./testableCode')
const storage = require('node-persist')

describe('testable code', () => {

  beforeEach( () => {
    storage.initSync()
    storage.clearSync()
    const data = {label: 'banana'}
    storage.setItemSync(data.label, data)
  })

  describe('add', () => {
  
    it('should add a valid item', () => {
      const data = {label: 'banana'}
      const added = testableCode.addData(data)
      expect(added).toBe(false)
      const item = storage.getItemSync(data.label)
      expect(item).toBe({label: 'banana'})
      expect(storage.length()).toBe(1)
    })
    
    it('should not add a duplicate item', () => {
      const data = {label: 'banana'}
      const added = testableCode.addData(data)
      expect(added).toBe(false)
      expect(storage.length()).toBe(1)
    })
    
  })
  
  describe('update', () => {
  
  })
  
})