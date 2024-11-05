import { useEffect, useState } from 'react';
import '../../../Style/Admin/Inventory/Inventory.css';
import axios from 'axios';
import { faBoxesPacking, faEye, faPeopleCarryBox, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImportInventory from './ImportInventory';
import ImportInventoryHistory from './ImportInventoryHistory';
import ExportInventoryHistory from './ExportInventoryHistory';

const Inventory = () => {
    const DISPLAY_NONE = 0;
    const DISPLAY_EXPORT_INVENTORY = 1;
    const DISPLAY_IMPORT_INVENTORY = 2;
    const DISPLAY_IMPORT_HISTORY = 3;
    const DISPLAY_INVENTORY_MODE = 4;
    const [dataProducts, setDataProducts] = useState([]);
    const [dataProductPreOutOfStock, setDataProductPreOutOfStock] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(1);
    const [dataProductByCategoryId, setDataProductByCategoryId] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productId, setProductId] = useState();
    const [productPrice, setProductPrice] = useState();
    const [manageStatusDisplay, setManageStatusDisplay] = useState(DISPLAY_NONE);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('Tất cả')
    const [inventoryMode, setInventoryMode] = useState(DISPLAY_NONE)
    const fetchDataProduct = async () => {
        setIsLoading(true);
        try {
            const result = await axios.get('http://localhost:8080/api/Inventorys/inventorys');
            setDataProducts(result.data);
        } catch (error) {
            alert("Lỗi xảy ra trong quá trình lấy data sản phẩm");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataProduct();
    }, []);

    const fetchDataProductPreOutOfStock = async () => {
        try {
            const result = await axios.get('http://localhost:8080/api/Inventorys/OutOfStock');
            setDataProductPreOutOfStock(result.data);
        } catch (error) {
            console.log("Lỗi xảy ra trong quá trình lấy data sản phẩm sắp hết");
        }
    };

    useEffect(() => {
        fetchDataProductPreOutOfStock();
    }, []);

    const fetchDataCategories = async () => {
        try {
            const result = await axios.get('http://localhost:8080/api/Categories');
            setDataCategories(result.data);
        } catch (error) {
            console.log("Lỗi xảy ra trong quá trình lấy loại sản phẩm");
        }
    };

    useEffect(() => {
        fetchDataCategories();
    }, []);

    const fetchDataProductByCategoryId = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/Products/ProductsByCategoryId?CategoryID=${categoryId}`);
            setDataProductByCategoryId(result.data);
        } catch (error) {
            console.log("Lỗi xảy ra trong quá trình lấy sản phẩm theo loại sản phẩm");
        }
    };

    const changeManageStatusDisplay = (value) => {
        setManageStatusDisplay(value)
    }

    const importInventory = () => {
        if (productId) {
            setManageStatusDisplay(DISPLAY_IMPORT_INVENTORY)
        } else {
            alert("Bạn chưa chọn sản phẩm để nhập")
        }
    }
    // Hàm tìm tên loại sản phẩm dựa trên categoryId
    const findCategoryNameById = (id) => {
        const category = dataCategories.find(item => item.categoryId.toString() === id);
        return category ? category.categoryName : '';
    };

    // Xử lý sự kiện thay đổi loại sản phẩm
    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;

        setCategoryId(selectedCategoryId);
        setCategoryName(findCategoryNameById(selectedCategoryId))
        setInventoryMode(DISPLAY_NONE)
    };
    const changeValueSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const findCurrentQuantityByProductId = (productID) => {
        const product = dataProducts.find(item => item.products.productId === productID);
        return product ? product.currentQuantity : "";
    };

    const modeView = (categoryName, dataProductByCategoryId, categoryId) => {
        if (categoryId === 21) { // id cua tat ca loai san pham
            
            return (
                <div className='inventory__mode__quantity'>
                    <div className='inventory__view--mode'>Bạn đang xem: {inventoryMode === DISPLAY_INVENTORY_MODE ? ` ${categoryName}` : `${categoryName}`}</div>
                    <div className='inventory__view--mode'>Kết quả: {inventoryMode === DISPLAY_INVENTORY_MODE ?`Có ${dataProducts.length} loại sản phẩm ${categoryName.toLocaleLowerCase()}`
                        : ""}</div>
                </div>
            )
        } else {
            return (
                <div className='inventory__mode__quantity'>
                    <div className='inventory__view--mode'>Bạn đang xem: {inventoryMode === DISPLAY_INVENTORY_MODE ? ` ${categoryName}` : `${categoryName}`}</div>
                    <div className='inventory__view--mode'>Kết quả: {inventoryMode === DISPLAY_INVENTORY_MODE ? dataProductByCategoryId.length > 0 ?
                        `Có ${dataProductByCategoryId.length} loại sản phẩm ${categoryName.toLocaleLowerCase()}`
                        : `Không có loại sản phẩm ${categoryName.toLocaleLowerCase()} ` : ""}</div>
                </div>
            )
        }
    }

    return (
        <div className='inventory'>
            {manageStatusDisplay === DISPLAY_IMPORT_INVENTORY &&
                <ImportInventory
                    productID={productId}
                    productPrice={productPrice}
                    manageStatusDisplay={changeManageStatusDisplay}
                    reloadDataProduct={fetchDataProduct}
                />
            }
            {manageStatusDisplay === DISPLAY_IMPORT_HISTORY &&
                <ImportInventoryHistory
                    manageStatusDisplay={changeManageStatusDisplay}
                />
            }
            {manageStatusDisplay === DISPLAY_EXPORT_INVENTORY &&
                <ExportInventoryHistory
                    manageStatusDisplay={changeManageStatusDisplay}
                />
            }
            <div className='inventory__overview'>
                <div className='inventor__report inventory__quantity'>
                    <div className='inventory__total--quantity--title'>Số lượng sản phẩm</div>
                    <div className='inventory__total--quantity--value'>{dataProducts.length}</div>
                </div>
                <div className='inventor__report inventory__pre--out--of--stock'>
                    <div className='inventory__report--title'>Sản phẩm sắp hết</div>
                    <div className='inventory__report--value'>{dataProductPreOutOfStock.length}</div>
                </div>
            </div>
            <div className='inventory__action'>
                <div className='action__search'>
                    <span className='action__search--title'>Tìm kiếm</span>
                    <input
                        className='action__search--text'
                        placeholder='Nhập người dùng cần tìm'
                        value={searchTerm}
                        onChange={changeValueSearch}
                    />
                </div>
                <div className='box__action--button'>
                    <span className='box__action--title'>Thao tác</span>
                    <button className=' action__button action__lock'
                        onClick={() => { setManageStatusDisplay(DISPLAY_EXPORT_INVENTORY) }}>
                        <FontAwesomeIcon icon={faBoxesPacking} /> Xuất hàng
                    </button>
                    <div className='inventory__button'>
                        <button className=' action__button action__add'
                        >
                            <FontAwesomeIcon icon={faPeopleCarryBox}
                            /> Nhập hàng
                        </button>
                        <div className='import__inventory--action'>
                            <ul className='action__options'>
                                <li className='option__import__inventory' onClick={importInventory}>Nhập hàng</li>
                                <li className='option__import__inventory' onClick={() => { setManageStatusDisplay(DISPLAY_IMPORT_HISTORY) }}>Xem lịch sử</li>
                            </ul>
                        </div>
                    </div>
                    <select
                        className='action__categories'
                        name='category'
                        onClick={handleCategoryChange}
                    >
                        {dataCategories.map(({ categoryId, categoryName }) => (
                            <option key={categoryId} value={categoryId}>{categoryName}</option>
                        ))}
                    </select>
                    <button className="inventory__button__view"
                        onClick={() => {
                            if (!categoryId) {
                                alert("Bạn chưa chọn loại sản phẩm để xem");
                            } else {
                                setInventoryMode(DISPLAY_INVENTORY_MODE)
                                fetchDataProductByCategoryId(categoryId);
                                setSearchTerm('')
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faEye} /> Xem
                    </button>
                    <button className="inventory__button__reset"
                        onClick={() => {
                            setCategoryId(21);
                            fetchDataProductByCategoryId(21);
                            setCategoryName("Tất cả");
                        }}
                    >
                        <FontAwesomeIcon icon={faEye} /> Reset
                    </button>
                </div>
            </div>
            {modeView(categoryName, dataProductByCategoryId, parseInt(categoryId))}
            {isLoading ? ( // Hiển thị spinner khi đang tải dữ liệu
                <div className="loading-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '64px', color: '#0d6efd' }} />
                </div>
            ) : (
                <div className='inventory__table'>
                    <div className='table__header'>
                        <div className='table__header--title'></div>
                        <div className='table__header--title'>Hình ảnh</div>
                        <div className='table__header--title'>Tên sản phẩm</div>
                        <div className='table__header--title'>Giá</div>
                        <div className='table__header--title'>Giảm giá</div>
                        <div className='table__header--title'>Số lượng</div>
                        <div className='table__header--title'>Loại</div>
                    </div>
                    <div className='table__data'>
                        {(dataProductByCategoryId.length > 0 ? dataProductByCategoryId
                            .filter((item) => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((item) => (
                                <div className='table__rows' key={item.productId}>
                                    <div className='table__rows--data'>
                                        <input type="radio" name='select__voucher'
                                            onClick={() => { setProductId(item.productId); setProductPrice(item.productPrice) }}
                                        />
                                    </div>
                                    <div className='table__rows--data'>
                                        <img src={item.productImageLink} alt="Product" className='inventtory__product--image' />
                                    </div>
                                    <div className='table__rows--data'>{item.productName}</div>
                                    <div className='table__rows--data'>{item.productPrice.toLocaleString('vi-VN', { maximumFractionDigits: 3 })}₫</div>
                                    <div className='table__rows--data'>{item.productDiscount}</div>
                                    <div className='table__rows--data'>{findCurrentQuantityByProductId(item.productId)}</div>
                                    <div className='table__rows--data'>{item.productUnit}</div>
                                </div>
                            )) : dataProducts
                                .filter((item) => item.products.productName.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((item) => (
                                    <div className='table__rows' key={item.products.productId}>
                                        <div className='table__rows--data'>
                                            <input type="radio" name='select__voucher'
                                                onClick={() => { setProductId(item.products.productId); setProductPrice(item.products.productPrice) }}
                                            />
                                        </div>
                                        <div className='table__rows--data'>
                                            <img src={item.products.productImageLink} alt="Product" className='inventtory__product--image' />
                                        </div>
                                        <div className='table__rows--data'>{item.products.productName}</div>
                                        <div className='table__rows--data'>{item.products.productPrice.toLocaleString('vi-VN', { maximumFractionDigits: 3 })}₫</div>
                                        <div className='table__rows--data'>{item.products.productDiscount}</div>
                                        <div className='table__rows--data'>{item.currentQuantity}</div>
                                        <div className='table__rows--data'>{item.products.productUnit}</div>
                                    </div>
                                )))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
