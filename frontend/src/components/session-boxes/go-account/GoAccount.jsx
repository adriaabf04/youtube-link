import React from 'react';
import FormField from "../../inputs/FormField"
import config from '../../../../config/config.json';
import axios from 'axios';

function GoAccount() {
    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    console.log(document.cookie)
    const checkSession = () => {
        const email = document.getElementById('email-init').value
        const pass = document.getElementById('pass-user-init').value
        if (username === '' || pass === '') {
          alert('Por favor, rellene todos los campos')
        } else {
          axios.post(`${config['back-ip']}/login/`, {
            email: email,
            password: pass
          },{
            withCredentials: true 
          
          }).then((response) => {
            if (response.status === 200) {
              window.location.href = '/'
            }
          }).catch((error) => {
            if (error.response.status === 404) {
              alert('Credenciales incorrectas')
            } else {
              console.log(error.response.data)
            }
          })
        }
    }

    return (
        <>
            <h1 className="ml-14 mt-10 text-6xl font-extrabold font-inter-title">Inicio de sesión</h1>
            <div className="data mt-10">
              <FormField generalClass={'place mb-5 ml-14'} htmlFor={'email-init'} classNameLabel={'font-inter text-xl'} textLabel={'Email'} type={'email'} id={'email-init'} placeholder={'Email'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
              <FormField generalClass={'place mb-5 ml-14'} htmlFor={'pass-user-init'} classNameLabel={'font-inter text-xl'} textLabel={'Contraseña'} type={'password'} id={'pass-user-init'} placeholder={'Contraseña'} classNameInput={'appearence-none border border-form-input h-14 mt-2 rounded-md shadow-2xl pl-5 font-inter'} />
            </div>
            
            <p className="ml-14 mt-3 font-inter">¿Todavía no tienes cuenta?, <span id="register-dir" className="cursor-pointer text-blue-700">regístrate</span></p>
            <button type="button" onClick={checkSession} className="ml-14 mt-5 border bg-black text-white p-3 w-[35%] rounded-md font-inter">Iniciar sesión</button>
        </>
    );
}

export default GoAccount;