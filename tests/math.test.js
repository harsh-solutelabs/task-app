test('Hello World',()=>{

})
test('This test Should Be Failure',()=>{
    // throw new Error('Failure!')
})
test('Async Test Demo',(done)=>{
    setTimeout(()=>{
        expext(1).toBe(2)
        done()
    },2000)
})