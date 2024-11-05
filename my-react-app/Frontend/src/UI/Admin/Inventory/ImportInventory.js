import { useState } from 'react';
import '../../../Style/Admin/Inventory/ImportInventory.css';
import axios from 'axios';

const ImportInventory = ({ productID,productPrice, manageStatusDisplay, reloadDataProduct }) => {
    const DISPLAY_NONE = 0;
    const [dataImportInventory, setDataImportInventory] = useState({
        productId: productID,
        quantity: '',
        price: productPrice,
        note: '',
        createBy: 15
    });

    const handleChangeValueImport = (e) => {
        const { name, value } = e.target;
        setDataImportInventory({
            ...dataImportInventory,
            [name]: value
        });
    };

    const changeManageStatusDisplay = () => {
        if (manageStatusDisplay) {
            manageStatusDisplay(DISPLAY_NONE);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        

        // Validate input
        const quantity = parseInt(dataImportInventory.quantity);
        const price = parseFloat(dataImportInventory.price);
        if (isNaN(quantity) || quantity <= 0) {
            return;
        }
        if (isNaN(price) || price < 0) {
            return;
        }

        // Prepare payload
        const payload = {
            ...dataImportInventory,
            quantity,
            price
        };

        const dataInventory = {
            quantity : payload.quantity,
            productId : payload.productId
        }
        try {
            const result = await axios.post(`http://localhost:8080/api/ImportInventorys/importInventorys`, payload);
            if (result.data === true) {
                const response = await axios.put(`http://localhost:8080/api/Inventorys/inventorys?quantity=${dataInventory.quantity}&productID=${dataInventory.productId}`);
                if(response.data === true) {
                    changeManageStatusDisplay(); // Close the modal after success
                    alert("Nhập hàng thành công");
                    reloadDataProduct();
                }
            } else {
                console.log('Nhập hàng không thành công. Vui lòng thử lại.');
            }
        } catch (error) {
           console.log("Lỗi trong quá trình nhập hàng");
        }
    };

    return (
        <div className="import__inventory">
            <h1 className='import__inventory--title'>Nhập hàng</h1>
            <form className='import__inventory--form' onSubmit={handleSubmit}>
                <div className='import__form--label--data'>
                    <label className='import--form--label'>Mã sản phẩm</label>
                    <input className='import--form--input' value={productID} disabled />
                </div>
                <div className='import__form--label--data'>
                    <label className='import--form--label'>Số lượng</label>
                    <input
                        className='import--form--input'
                        type='number'
                        name='quantity'
                        value={dataImportInventory.quantity}
                        onChange={handleChangeValueImport}
                    />
                </div>
                <div className='import__form--label--data'>
                    <label className='import--form--label'>Giá</label>
                    <input
                        className='import--form--input'
                        type='number'
                        name='price'
                        value={dataImportInventory.price}
                        onChange={handleChangeValueImport}
                    />
                </div>
                <div className='import__form--label--data'>
                    <label className='import--form--label'>Ghi chú</label>
                    <input
                        className='import--form--input'
                        type='text'
                        name='note'
                        value={dataImportInventory.note}
                        onChange={handleChangeValueImport}
                    />
                </div>
                <div className='import__form--button'>
                    <button type='button' className='import__form--button--close' onClick={changeManageStatusDisplay}>Đóng</button>
                    <button type='submit' className='import__form--button--submit'>Xác nhận</button>
                </div>
            </form>
        </div>
    );
};

export default ImportInventory;
