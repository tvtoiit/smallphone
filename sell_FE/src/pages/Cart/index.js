
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState  } from 'react';
import { uses, delete_cart, checkDetails } from '~/assets/images';

const cx = classNames.bind(styles);
function Cart() {
    const [numberProduct, setNumberProduct] = useState(0);
    const [cart, setCart] = useState((JSON.parse(localStorage.getItem('cart'))) || []);

    const hanldDeleteCart = (id) => {
        const updateCart = cart.filter(item => item.productId !== id);
        setCart(updateCart);
        localStorage.setItem('cart', JSON.stringify(updateCart));
    }

    const getCountNumber = () => {
        const totalQuantity = cart.reduce((accumulator, item) => accumulator + item.number, 0);
        return totalQuantity;
    }

    const getPrice = () => {
        const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(totalPrice);
        return formattedPrice;
    }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('l-12 m-12 c-12')}>
                <div className={cx('container-cart')}>
                    <div className={cx('nav-cart')}>
                        <NavLink to='/' className={cx('buy-more')}>
                            <FontAwesomeIcon className={cx('buy-more__icon')} icon = {faAngleLeft}/>
                            <span className={cx('buy-more_text')}>Mua thêm sản phẩm khác</span>
                        </NavLink>
                        <NavLink to='/authen' className={cx('user')}>
                            <img src={uses.use} className={cx('user-img')} alt='User'/>
                            <span className={cx('User-login')} >Đăng nhập</span>
                        </NavLink>
                    </div>
                    <div className={cx('container-inner')}>
                        <div className={cx('list-products')}>

                            {cart.map((item, index) => (
                            
                            <div key={index} className={cx('product-cart1')}>
                                <div className={cx('product-cart')}>
                                    <div className={cx('product-image')}>
                                        <NavLink className={cx('product-image__link')}>
                                            <img className={cx('product-image__img')} src={item.image} alt="Ảnh điện thoại"/>
                                        </NavLink>
                                        <NavLink onClick={() => hanldDeleteCart(item.productId)} className={cx('cart-btn_delete')}>
                                            <img src={delete_cart.delete} alt='Icon xóa cart'/>
                                            <span className={cx('delete_btn-text')}>Xóa</span>
                                        </NavLink>
                                    </div>
                                    <div className={cx('product-detail')}>
                                        <div className={cx('top_detail')}>
                                            <NavLink to={'/'} className={cx('top_detail-link')}> 
                                                {item.title}
                                            </NavLink>
                                        </div>
                                        <div className={cx('accessories')}>
                                            <h4 className={cx('accessories-sell')}>Khuyến mãi:</h4>
                                            <ul className={cx('accessories-list')}>
                                                <li className={cx('accessories-item')}>
                                                    <img className={cx('accessories-img')} src={checkDetails.check} alt='checkDetails'/>
                                                    <span className={cx('accessories-text')}>Tặng sạc, cable nhanh 20W cao cấp khi nâng cấp bảo hành DGold</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={cx('product-price')}>
                                        <div className={cx('fee')}>
                                            <p className={cx('price-item')}>{item.price * item.number}đ </p>
                                            <del className={cx('old-price')}>{item.priceOld}đ</del>
                                        </div>
                                        <div className={cx('quan')}>
                                            <div className={cx('number-input')}>
                                                <button type='button' className={cx('down')}></button>
                                                <input
                                                    type='number'
                                                    value={numberProduct !== 0 ? numberProduct : item.number} 
                                                    onChange={(e) => {
                                                        setNumberProduct(e.target.value);        
                                                    }} 
                                                    className={cx('numbersOnly1')}
                                                />
                                                <button type='button' onClick={() => setNumberProduct(numberProduct !== 0 ? numberProduct + 1 : item.number + 1)} className={cx('plus')}></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            
                        </div>
                        <div className={cx('total-price-products')}>
                            <p className={cx('total-price__para')}>
                                <span className={cx('price_tam')}>Tạm tính ({getCountNumber()}) sản phẩm: </span>
                                <span className={cx('price_tam')}>{getPrice()}</span>
                            </p>
                            <p className={cx('total-price__para')}>
                                <span className={cx('price_tam')}>Phí vận chuyển: </span>
                                <span className={cx('price_tam')}>Liên hệ</span>
                            </p>
                            <p className={cx('total-price__para')}>
                                <span className={cx('price_tam')}>Mã giảm giá: </span>
                                <span className={cx('price_tam')}>0đ</span>
                            </p>
                            
                        </div>

                        <div className={cx('l-12 m-12 c-12')}>
                            <form className={cx('formPayment')}>
                                <h3 className={cx('h3_title')}>Thông tin mua hàng</h3>
                                <div className={cx('content-form__cart')}>
                                    <label className={cx('gender1')} htmlFor='gender1'>
                                        <input type='radio' id="gender1" name="gender" value=""/>
                                        <span className={cx('gender-span')}>Anh</span>
                                    </label>
                                    <label className={cx('gender1')} htmlFor='gender0'>
                                        <input type='radio' id="gender0" name="gender" value=""/>
                                        <span className={cx('gender-span')}>Chị</span>
                                    </label>
                                </div>
                                <div className={cx('l-12')}>
                                    <div className={cx('content-input__info')}>
                                        <div className={cx('l-6 m-6 c-12')}>
                                            <div className={cx('padding-input_info')}>
                                                <input type='text' className={cx('input-form__cart')} placeholder='Họ tên'/>               
                                            </div>
                                        </div>
                                        <div className={cx('l-6 m-6 c-12')}>
                                            <div className={cx('padding-input_info')}>
                                                <input type='text' className={cx('input-form__cart')} placeholder='Số điện thoại'/>               
                                            </div>
                                        </div>               
                                    </div>
                                    
                                </div>
                                <h3 className={cx('h3_title')}>Cách thức chọn mua hàng</h3>
                                <div className={cx('typeReceive')}>
                                    <label className={cx('gender1')} htmlFor='typeReceive0' title='Giao hàng tận nơi'>
                                        <input type='radio' name='receive' id ='typeReceive0'/>
                                        <span className={cx('gender-span')}>Giao tận nơi</span>
                                    </label>
                                    <label className={cx('gender1')} htmlFor='typeReceive1' title='Giao hàng tận nơi'>
                                        <input type='radio' name='receive' id ='typeReceive1'/>
                                        <span className={cx('gender-span')}>Nhận tại cữa hàng</span>
                                    </label>
                                </div>
                                <div className={cx('tabReceive')}>
                                    <div className={cx('mainTab')}>
                                        <p className={cx('tab-title')}>Chọn địa chỉ để biết thời gian và phí vận chuyển (nếu có)</p>
                                        <div className={cx('row_1')}>
                                            <div className={cx('col-md-12')}>
                                                <div className={cx('pd1')}>
                                                    <select className={cx('pd1-select')}>
                                                        <option>Tỉnh/ Thành phố</option>
                                                    </select>
                                                </div>
                                                <div className={cx('pd1')}>
                                                    <select className={cx('pd1-select')}>
                                                        <option>Huyện</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={cx('col-md-12')}>
                                                <div className={cx('pd1')}>
                                                    <select className={cx('pd1-select')}>
                                                        <option>Xã</option>
                                                    </select>
                                                </div>
                                                <div className={cx('pd1')}>
                                                    <select className={cx('pd1-select')}>
                                                        <option>Số nhà tên đường</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                        </div>                
                                    </div>

                                </div>
                                <div className={cx('total_end')}>
                                <span>Tổng tiền:</span>
                                <span style={{color: '#FF6700'}}>{getPrice()}</span>                         
                                </div>
                                <div className={cx('btn-area')}>
                                    <NavLink className={cx('payment-btn')}>
                                        Đặt hàng                    
                                    </NavLink>
                                </div>
                            </form>                    
                        </div>
                        
                    </div>
                    <span className={cx('agree')}>Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của Didongthongminh</span>
                </div>
            </div> 
        </div>
    );
}
export default Cart;