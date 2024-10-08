import './ModalSpinner.css';

function ModalSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <div className="flex items-center justify-center">
                    <div className="loader"></div>
                </div>
                <p className="mt-4 text-center text-gray-700">Cargando...</p>
            </div>
        </div>
    );
}

export default ModalSpinner;