import React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderProduct.module.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState  } from 'react';

const cx = classNames.bind(styles);

function OrderProduct() {
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [optionedProvince, setOptionProvince] = useState();
    const [optionWard, setOptionWard] = useState(district[0] ? district[0].districtId : '');

    const handleSelectChange = (event) => {
        const selectOption = event.target.value;
        setOptionProvince(selectOption);
    }

    const handleSelectWard = (event) => {
        setOptionWard(event.target.value);
    }

    //kiểm tra nếu district none
    if (optionedProvince === '1234f') {
        setOptionProvince(-1);
        setOptionWard(-1);
    }

    useEffect(() => {
        // Kiểm tra nếu district có ít nhất một phần tử và optionWard hiện không khớp với bất kỳ giá trị district nào
        if (district.length > 0 && !district.some(item => item.districtId === optionWard)) {
          // Cập nhật optionWard thành giá trị đầu tiên của district
          setOptionWard(district[0].districtId);
        }
      }, [district]);

    useEffect(() => {
        const apiWard = `http://localhost:8888/api/v1/wrad/${optionWard}`;
        fetch(apiWard)
            .then((response) => response.json())
            .then(data => setWard(data))
            .catch(error => console.log(error))
    }, [optionWard])

    useEffect(() => {
        const api = `http://localhost:8888/api/v1/province`;
        fetch(api)
        .then(response => response.json())
        .then(data => setProvince(data))
        .catch(error => console.error('catch fetch', error));
    }, []);

    useEffect(() => {
        const api = `http://localhost:8888/api/v1/district/${optionedProvince}`;
        fetch(api)
            .then(response => response.json())
            .then(data => setDistrict(data))
            .catch(error => console.error('catch fetch', error))
    }, [optionedProvince])

    
    return (
        <div className={cx('l-12 m-12 c-12')}>
            <form className={cx('formPayment')}>
                <h3 className={cx('h3_title')}>Thông tin mua hàng</h3>
                <div className={cx('content-form__cart')}>
                    <label className={cx('gender1')} htmlFor="gender1">
                        <input type="radio" checked id="gender1" name="gender" value="" />
                        <span className={cx('gender-span')}>Anh</span>
                    </label>
                    <label className={cx('gender1')} htmlFor="gender0">
                        <input type="radio" id="gender0" name="gender" value="" />
                        <span className={cx('gender-span')}>Chị</span>
                    </label>
                </div>
                <div className={cx('l-12')}>
                    <div className={cx('content-input__info')}>
                        <div className={cx('l-6 m-6 c-12')}>
                            <div className={cx('padding-input_info')}>
                                <input type="text" className={cx('input-form__cart')} placeholder="Họ tên" />
                            </div>
                        </div>
                        <div className={cx('l-6 m-6 c-12')}>
                            <div className={cx('padding-input_info')}>
                                <input type="text" className={cx('input-form__cart')} placeholder="Số điện thoại" />
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className={cx('h3_title')}>Cách thức chọn mua hàng</h3>
                <div className={cx('typeReceive')}>
                    <label className={cx('gender1')} htmlFor="typeReceive0" title="Giao hàng tận nơi">
                        <input type="radio" checked name="receive" id="typeReceive0" />
                        <span className={cx('gender-span')}>Giao tận nơi</span>
                    </label>
                    <label className={cx('gender1')} htmlFor="typeReceive1" title="Giao hàng tận nơi">
                        <input type="radio" name="receive" id="typeReceive1" />
                        <span className={cx('gender-span')}>Nhận tại cữa hàng</span>
                    </label>
                </div>
                <div className={cx('tabReceive')}>
                    <div className={cx('mainTab')}>
                        <p className={cx('tab-title')}>Chọn địa chỉ để biết thời gian và phí vận chuyển (nếu có)</p>
                        <div className={cx('row_1')}>
                            <div className={cx('col-md-12')}>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <select className={cx('pd1-select')} onChange={handleSelectChange} value={optionedProvince}>
                                           <option key={"1234f"} value={"1234f"}>Tỉnh/ Thành phố</option>
                                           {province.map((item) => (
                                                <option style={{padding: '5px', height: '100px'}} className={cx('pd1-select__option')} key={item.provinceCityId} value={item.provinceCityId}>
                                                    {item.name}
                                                </option>
                                            ))} 
                                        </select>
                                    </div>
                                    
                                </div>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <select className={cx('pd1-select')} onChange={handleSelectWard} value={optionWard}>
                                            <option key={"1234f"} value={"1234f"}>Quận/ Huyện</option>
                                            {district.map(item => (
                                                <option key={item.districtId} value={item.districtId}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-md-12')}>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <select className={cx('pd1-select')}>
                                            <option key={"1234f"} value={"1234f"}>Phường/ Xã</option>
                                            {ward.map(item => (
                                                <option key={item.districtId}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={cx('pd1')}>
                                    <div className={cx('l-12 m-12 c-12')}>
                                        <input className={cx('pd1-select')} placeholder='Số nhà tên đường'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('total_end')}>
                    <span>Tổng tiền:</span>
                    <span style={{ color: '#FF6700' }}>{123}</span>
                </div>
                <div className={cx('btn-area')}>
                    <NavLink to={''} className={cx('payment-btn')}>Đặt hàng</NavLink>
                </div>
            </form>
        </div>
    );
}

export default OrderProduct;
