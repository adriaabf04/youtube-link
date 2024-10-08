import axios from 'axios';
import config from '../../../config/config.json';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
function Sidebar() {
    const [dataUser, setDataUser] = useState({})
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
    const logout = () => {
        fetch(config['back-ip']+'/logout/', {
            method: 'POST',
            credentials: 'include'  // Esto asegura que las cookies se envíen con la solicitud
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = '/session'
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }
    useEffect(() => {
        if(getCookie('auth_token') == null) {
            window.location.href = '/session'
        } else {
          fetch(config['back-ip']+'/userinfo/', {
            method: 'POST',
            credentials: 'include'  // Esto asegura que las cookies se envíen con la solicitud
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => 
            setDataUser(data)
          )
          .catch(error => console.error('There has been a problem with your fetch operation:', error));
          }
          console.log(dataUser)
    }, []);
    return (
        <header id="header-box" className="fixed">
            <div id="image" className="itemder-blue-500 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full"><img src="/img/logo-cooking.png" alt="logo proyecto" /></div>
            </div>
            <nav id="options" className="item-header flex flex-col items-center justify-around">
                <Link to={'/'}><span className="flex items-center gap-3"><img src="/svg/house.svg" alt="" className="w-[50px]" /><span>Home</span></span></Link>
                <Link to={'/buscar'}><span className="flex items-center gap-3"><img src="/svg/search.svg" alt="" className="w-[50px]" /><span>Buscar</span></span></Link>
                <Link to={'/crear'}><span className="flex items-center gap-3"><img src="/svg/plus.svg" alt="" className="w-[50px]" /><span>Crear</span></span></Link>
                <Link to={'/amigos'}><span className="flex items-center gap-3"><img src="/svg/amigos.svg" alt="" className="w-[50px]" /><span>Amigos</span></span></Link>
            </nav>
            <div id="profile" className="item-header border-t-2 border-black flex justify-around">
                <div className="flex items-center gap-2 ml-3 w-[80%]">
                    <div className="w-16 h-16 rounded-full"><img src="/svg/persona.svg" alt="" /></div>
                    <Link to={'/perfil'}>
                        <div>
                            <span id="fullname-user">{dataUser.username}</span>
                        </div>
                    </Link>
                </div>
                <button className="w-[20%]" onClick={logout}><img src="/svg/exit.svg" className="w-[50px]" alt="" /></button>
            </div>
        </header>
    );
}

export default Sidebar;