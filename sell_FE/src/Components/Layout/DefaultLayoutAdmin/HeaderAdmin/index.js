import images from '../../../../assets/images';
import styles from './HeaderAdmin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function HeaderAdmin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img className={cx('inner-logo')} src={images.logo}/>
            </div>
        </div>
    );
}

export default HeaderAdmin;