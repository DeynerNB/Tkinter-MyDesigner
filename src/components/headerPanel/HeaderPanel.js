import React from 'react';
import "./HeaderStyle.css"

function HeaderPanel() {

    return (
        <div id='header-container'>
            <div className='header-title-container d-flex justify-content-between'>
                <h1 className='py-2'>Tkinter MyDesigner</h1>
                <div>
                    <a href='https://github.com/DeynerNB' target='_blank' rel="noopener noreferrer" className='header-title-link fs-5'>
                        <span className='pe-1'>Hecho por DeynerNB</span>
                        <i className="fa-brands fa-github"></i>
                    </a>
                </div>
            </div>
            <p className='m-0'>Este es un pequeño proyecto para simplificar el proceso de construir interfaces con Tkinter</p>
            <p className='m-0'>Solo debes seleccionar el objeto que deseas crear en el panel de "Elementos" y seleccionarlo para moverlo o cambiar aspectos de su configuración.</p>
            <p className='m-0 pb-3'>Una vez finalizado el diseño, simplemente presionar el botón de "Generar código"</p>
        </div>
    );
}

export default HeaderPanel;
