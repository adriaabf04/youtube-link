import FormField from "../../inputs/FormField"
import config from '../../../../config/config.json';
function Register(){
    const checkRegister = () => {
        const name = document.getElementById('name').value
        const surname = document.getElementById('surname').value
        const username = document.getElementById('username').value
        const email = document.getElementById('email-user').value
        const pass = document.getElementById('pass-user').value
        const repeatedPass = document.getElementById('pass-user-repeat').value
        if (name == '' || surname == '' || username == '' || email === '' || pass === '') {
          alert('Por favor, rellene los campos obligatorios')
        } else {
          if(pass !== repeatedPass){
            alert('Las contraseñas no coinciden')
          } else {
            fetch(config['back-ip']+'/register/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: "include",
              body: JSON.stringify({
                name: name,
                surname: surname,
                username: username,
                email: email,
                password: pass
              })
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              window.location.href = '/'  
            })
            .catch(error => console.error('There has been a problem with your fetch operation:', error
            ));
          }
        }
    }
    return (
        <>
            <h1 className="text-6xl text-center font-extrabold font-inter-title">Registrarse</h1>
            <div className="data mt-10">
              <div className="flex flex-row gap-20 ml-14">
                  <FormField generalClass={'place mb-5'} htmlFor={'name'} classNameLabel={'font-inter text-xl'} textLabel={'Nombre'} type={'text'} id={'name'} placeholder={'Nombre'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
                  <FormField generalClass={'place mb-5'} htmlFor={'surname'} classNameLabel={'font-inter text-xl'} textLabel={'Apellidos'} type={'text'} id={'surname'} placeholder={'Apellidos'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
              </div>
              <div className="flex flex-row gap-20 ml-14">
                <FormField generalClass={'place mb-5'} htmlFor={'username'} classNameLabel={'font-inter text-xl'} textLabel={'Nombre de usuario'} type={'text'} id={'username'} placeholder={'Nombre de usuario'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
                <FormField generalClass={'place mb-5'} htmlFor={'email-user'} classNameLabel={'font-inter text-xl'} textLabel={'Correo electrónico'} type={'email'} id={'email-user'} placeholder={'Correo electrónico'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
              </div>
              <div className="flex flex-row gap-20 ml-14">
                <FormField generalClass={'place mb-5'} htmlFor={'pass-user'} classNameLabel={'font-inter text-xl'} textLabel={'Contraseña'} type={'password'} id={'pass-user'} placeholder={'Contraseña'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
                <FormField generalClass={'place mb-5'} htmlFor={'pass-user-repeat'} classNameLabel={'font-inter text-xl'} textLabel={'Repetir contraseña'} type={'password'} id={'pass-user-repeat'} placeholder={'Repetir contraseña'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
              </div>
              <p className="mt-3 text-center font-inter">¿Ya dispones de una cuenta?, <span id='sesion-dir' className="cursor-pointer text-blue-700">inicia sesión</span></p>
              <div className="flex justify-center">
                <button onClick={checkRegister} className="mt-5 border bg-black text-white p-3 w-[70%] rounded-md font-inter">Registrarse</button>
              </div>
            </div>
        </>
    )
}

export default Register