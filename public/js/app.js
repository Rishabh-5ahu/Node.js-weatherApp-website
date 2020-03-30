console.log('client side javascript file is loaded')

const weatherForm=document.querySelector('form')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=document.querySelector('input').value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                document.getElementById('msg1').innerHTML=data.error
            else
            {
                document.getElementById('msg1').innerHTML=data.location
                document.getElementById('msg2').innerHTML=data.forecast
                console.log(data.forecast)
            }
        })
})
})