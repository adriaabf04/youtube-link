function AdvancedSessionBox({children, imageSession, reverse = false}) {
    return (
        
        <div className={`session-box w-[80%] h-[65%] flex ${reverse ? 'flex-row-reverse': ''}`}>
            <div className="w-[50%] bg-trans-white">
                {children}
            </div>
            <div className="image-box w-[50%]">
                <img src={imageSession} alt="Imagen de sesión" className="h-full" />
            </div>
            
        </div>
        
    )
}

export default AdvancedSessionBox