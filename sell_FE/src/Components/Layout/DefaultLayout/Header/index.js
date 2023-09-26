import { Wrapper as WrapperPopper } from '../../../Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

import classNames from 'classnames/bind';
import images, { cate_btn, call_btn, the_row, stores, logins, proMax, avatas, iconLogoMobile } from '../../../../assets/images';
import Tippy from '@tippyjs/react';
import { useEffect, useState, useContext, Fragment } from 'react';
import UserRoleContext from '../../../../pages/UserRole';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function Header() {
    const { checkAdmin } = useContext(UserRoleContext);
    const [searchResult, setSearchResult] = useState([]);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    let [valueInputSearch, setValueInputSearch] = useState("");

    const getNumberCartLocalStorage = () => {
        const array = JSON.parse(localStorage.getItem('cart'));
        const number = array.reduce((acc, item) => acc + item.number, 0);
        return number;
    }

    getNumberCartLocalStorage();
    const removeLocalStorage = () => {
        localStorage.removeItem('token');
        setIsBoxVisible(false);
    }

    const handleAvataClick  = () => {
        setIsBoxVisible(!isBoxVisible);
    }

    const hasLocalStorageData  = !!localStorage.getItem('token');
    useEffect(() => {
        if (valueInputSearch === "") {
            valueInputSearch = "/none";
        } 
        const api = `http://localhost:8888/api/v1/search?keyword=${valueInputSearch}`;
            fetch(api)
            .then(response => response.json())
            .then(data => setSearchResult(data))
            .catch(err => console.log(err));
    }, [valueInputSearch]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner col')}>
                <div className={cx('menu-store')}>
                    <div className={cx('logo_site')}>
                        <NavLink to='/' className={cx('img-home')}>
                            <img className={cx('img-home-a')} src={images.logo} alt="logo di động thông minh pc" />
                            <img className={cx('img-home-a__mobi')} src={iconLogoMobile.iconMobi} alt="logo di động thông minh mobile" />
                        </NavLink>
                    </div>
                    <div className={cx('menu-center')}>
                        <button className={cx('cate-btn')}>
                            <img className={cx('cate-btn__img')} src={cate_btn.cate} alt="cate" />
                            Danh mục
                        </button>
                        <div className={cx('address_pc')}>
                            <div className={cx('select_city')}>
                                <button className={cx('btn-drop')}>
                                    <span className={cx('title')}>Xem giá, tồn kho tại:</span>
                                    <span className={cx('click_drop')}>
                                        Hà Nội
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <Tippy
                            interactive
                            visible={searchResult.length > 0 && valueInputSearch !== ""}
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="-1">
                                    <div className={cx('search-result__content')} style={{ maxHeight: '300px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
                                    <WrapperPopper>
                                            {searchResult.map((item, index) => (
                                                <div className={cx('autocomplete-suggestion')} key={index}>
                                                    <NavLink to={`/detail/${item.productId}`}  className={cx('autocomplete-suggestion__a')}>
                                                        <img 
                                                            className={cx('autocomplete-suggestion__img')}
                                                            src={item.thumbnail}
                                                            alt={item.altText}
                                                        />
                                                        <label className={cx('label-group')}>
                                                            <span>
                                                                <strong className={cx('strong')}>{item.title}</strong>
                                                                <span>{item.description}</span>
                                                            </span>
                                                            <span className={cx('price')}>{item.price}</span>
                                                        </label>
                                                    </NavLink>
                                                </div>
                                            ))}
                                    </WrapperPopper>
                                        </div>
                                </div>
                            )}
                        >
                            <div id={cx('search_simple')}>
                                <div className={cx('search_simple_content')}>
                                    <form id={cx('search_form_simple')}>
                                        <input
                                            onChange={e => setValueInputSearch(e.target.value)}
                                            value={valueInputSearch}
                                            className={cx('search_form_simple-input')}
                                            type="text"
                                            placeholder="Bạn tìm gì ở đây!"
                                        />
                                    </form>
                                </div>
                            </div>
                        </Tippy>

                        <div className={cx('right_menu')}>
                            <div href="" className={cx('hotline_menu')}>
                                <img className={cx('hotline_menu-img')} src={call_btn.call} alt="gọi điện" />
                                <div className={cx('right_menu__text')}>
                                    <span className={cx('right_menu__text-span')}>Gọi mua hàng</span>
                                    <span className={cx('right_menu__text-span')}>085 5100 001</span>
                                </div>
                            </div>

                            <div className={cx('address')}>
                                <img src={the_row.row} className={cx('address_img')} alt="Địa chỉ" />
                                <div className={cx('address__text')}>
                                    <span className={cx('address__text-span')}>Cửa hàng</span>
                                    <span className={cx('address__text-span')}>Gần bạn</span>
                                </div>
                            </div>

                            <NavLink to='/cart' className={cx('store-cart')}>
                                <img src={stores.store} alt="store" />
                                <span className={cx('ncc')}>{getNumberCartLocalStorage()}</span>
                            </NavLink>

                            <div  className={cx('login-a')}>
                                {hasLocalStorageData ? (
                                    <div onClick={handleAvataClick} className={cx('avatas')}>
                                        <NavLink >
                                            <img className={cx('avata-img')} src={avatas.avata}  alt="login-img" />
                                        </NavLink>
                                     </div>
                                ): (
                                    <NavLink to='/authen'>
                                        <img  src={logins.login}  alt="login-img" />
                                    </NavLink>
                                )}
                                    
                            </div>
                             {isBoxVisible && <div className={cx('box-telegory')}>
                                <ul className={cx('box-list')}>
                                    <div className={cx('avataWrapper')}>
                                        <div className={cx('item-avata')}>
                                            <img className={cx('item-avata__img')} src={avatas.avata}  alt="login-img" />
                                        </div>
                                        <div className={cx('avata-info')}>
                                            <span className={cx('avata-usename')}>Trần Tới</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <ul className={cx('menu-list')}>
                                        <li>
                                            <NavLink className={cx('menu-item')}>
                                                Đơn hàng
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <hr/>
                                    {checkAdmin === true ?
                                    <ul className={cx('menu-list')}>
                                        <li>
                                            <NavLink to= '/admin' className={cx('menu-item')}>
                                                Admin
                                            </NavLink>
                                        </li>
                                    </ul> : <Fragment/>}
                                    <hr/>
                                    <ul className={cx('menu-list')}>
                                        <li onClick={removeLocalStorage}>
                                            <NavLink className={cx('menu-item')}>
                                                Đăng xuất
                                            </NavLink>
                                        </li>
                                    </ul>
                                </ul>
                            </div>}           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
