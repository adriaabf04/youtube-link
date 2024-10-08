import './Post.css';
function Post() {
    return (
        <div className="receta">
            <div id="imagen" className="bg-[url('../public/img/fondo-sesrer.jpg')] bg-cover bg-center"></div>
            <div id="description">
                <div className="data-recipe">
                    <span>Pollo al curry</span>
                    <div id="author" className="flex items-center mr-5">
                        <img src="/svg/persona.svg" className="w-[50px] h-[50px] rounded-full" alt="" />
                        <div id="user-author" className="">adriaanbf04</div>
                    </div>
                </div>
                <div id="categories-recipe">
                    <div className="breadcumb"><span>Pollo</span></div>
                    <div className="breadcumb"><span>Curry</span></div>
                    <div className="breadcumb"><span>Coco</span></div>
                </div>
                <p id="text" className="mt-2">
                    Preciosa receta de pollo al curry, con un toque de coco y leche de coco, que le da un sabor muy especial.
                </p>
            </div>
            <div id="valoration" className="flex justify-between">
                <div id="actions-per" className="flex gap-4">
                    <div id="like" className="flex items-center">
                        <img src="/svg/non-liked.svg" alt="" className="w-[40px]" />
                        <span>100</span>
                    </div>
                    <div id="comment" className="flex items-center">
                        <img src="/svg/comentario.svg" alt="" className="w-[30px]" />
                        <span>50</span>
                    </div>
                </div>
                <div className="flex" id="stars">
                    <img src="/svg/valoracion.svg" alt="" />
                    <img src="/svg/valoracion.svg" alt="" />
                    <img src="/svg/valoracion.svg" alt="" />
                    <img src="/svg/valoracion.svg" alt="" />
                    <img src="/svg/valoracion.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Post;