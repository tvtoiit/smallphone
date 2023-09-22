import { useNavigate } from 'react-router-dom';
import CustomApi from '~/CustomApi';
import styles from './AdminProduct.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function AdminProduct() {
    let navigater = useNavigate();
    const {data} = CustomApi('http://localhost:8888/api/v1/product-home');

    const hanldAddProduct = () => {
        navigater('/addproduct');
    }

    const handleUpdateProduct = (data) => {
        navigater(`/addproduct?productId=${data}`)
    }

    const renderActions = (idProduct) => {
        return (
        <td className={cx('inner-btn')}>
            <input value='Thêm' onClick={hanldAddProduct} type='button' className={cx('btn-add')}/>
            <input value='Sửa' onClick={() => handleUpdateProduct(idProduct)} type='button' className={cx('btn-update')}/>
            <input value='Xóa' type='button' className={cx('btn-delete')}/>
        </td>);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h3 className={cx('inner-h3')}>Quản Lí Sản Phẩm</h3>
                <hr/>
                <table className={cx('inner-table')}>
                    <thead className={cx('inner-table_thead')}>
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Hình ảnh</th>
                            <th style={{width :'50px'}}>Hành động</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                   {data.map((item, index) => (
                        item.products.map((itemproduct,subIndex) => (
                        <tr key={`${index} - ${subIndex}`}
                            className={index % 2 === 0 ? cx('even-row') : cx('odd-row')}
                        >
                            <td>{index++}</td>
                            <td>{itemproduct.title}</td>
                            <td>{itemproduct.price}đ</td>
                            <td>{itemproduct.number}</td>
                            <td>
                                <img className={cx('table-images')} src={itemproduct.thumbnail} alt='Ảnh'/>
                            </td>
                            {renderActions(itemproduct.productId)} 
                    </tr>
                        ))
                        
                   ))}     
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProduct;