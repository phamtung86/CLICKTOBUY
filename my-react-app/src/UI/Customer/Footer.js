import { Link } from 'react-router-dom';
import '../../Style/Footer.css'
const Footer = () => {
   return (
      <div className='footer'>
         <div className='footer__services--ads'>
            <div className='services--ads'>
               <img className='ads--image' src='https://cdn-crownx.winmart.vn/images/prod/162964655378716287682220181-1--og.png' alt='Banner'/>
               <div className='ads--title'>Sản phẩm an toàn</div>
            </div>
            <div className='services--ads'>
               <img className='ads--image' src='https://cdn-crownx.winmart.vn/images/prod/162964658411816287682628462-1--og.png' alt='Banner' />
               <div className='ads--title'>Chất lượng cam kết</div>
            </div>
            <div className='services--ads'>
               <img className='ads--image' src='https://cdn-crownx.winmart.vn/images/prod/162964661464516287682943943-1--og.png'  alt='Banner'/>
               <div className='ads--title'>Dịch vụ vượt trội</div>
            </div>
            <div className='services--ads'>
               <img className='ads--image' src='https://cdn-crownx.winmart.vn/images/prod/162964665580516292779811154-1--og.png'  alt='Banner'/>
               <div className='ads--title'>Giao hàng nhanh</div>
            </div>
         </div>
         <div className='footer__services--detail'>
            <div className='footer__services--detail--info'>
               <div className='services--detail--company'>
                  <div className='company__name'>CLICKTOBUY</div>
                  <div className='company__name--detail'>Công ty cổ phần dịch vụ thương mại tổng hợp PVT </div>
                  <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d391.380037232614!2d105.76201649258778!3d21.0544660507328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455d59dbfcddb%3A0x243763f507f51e54!2zTmjDoCB2xINuIGhvw6EgdOG7lSAxNCBQaMO6IERp4buFbg!5e0!3m2!1svi!2s!4v1726043449735!5m2!1svi!2s"
                  width="300"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
               </div>
               <div className='services--detail--support'>
                  <h6 className='support--type'>Về chúng tôi</h6>
                  <ul className='support__type--detail'>
                     <li className='support--about'>
                        <Link className='support--about--click'>Giới thiệu về PVT</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Danh sách cửa hàng</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Quản lý chất lượng</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Chính sách bảo mật</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Điều khoản và điều kiện giao dịch</Link>
                     </li>
                  </ul>
               </div>
               <div className='services--detail--support'>
                  <h6 className='support--type'>Hỗ trợ khách hàng</h6>
                  <ul className='support__type--detail'>
                     <li className='support--about'>
                        <Link className='support--about--click'>Trung tâm hỗ trợ khách hàng</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Chính sách giao hàng</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Chính sách thanh toán</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Chính sách đổi trả</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Đánh giá góp ý</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'>Danh sách trúng thưởng</Link>
                     </li>
                  </ul>
               </div>
               <div className='services--detail--support'>
                  <h6 className='support--type'>Chăm sóc khách hàng</h6>
                  <ul className='support__type--detail'>
                     <li className='support--about'>
                        <Link className='support--about--click' to={"tel: +84344509700"}>Mua online: 0344508700</Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click' to={"mailto: phamvantung149@gmail.com"}>Email: phamvantung149@gmail.com</Link>
                     </li>
                  </ul>
                  <div className='services--detail--support'>
                  <h6 className='support--type'>Kết nối chúng tôi</h6>
                  <ul className='support__type--detail--connect'>
                     <li className='support--about'>
                        <Link className='support--about--click'><i class="fa-brands fa-youtube"></i> </Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click' to={'https://facebook.com/phamtung149'}><i class="fa-brands fa-facebook"></i></Link>
                     </li>
                     <li className='support--about'>
                        <Link className='support--about--click'><i class="fa-brands fa-square-instagram"></i></Link>
                     </li>
                  </ul>
               </div>
               </div>
            </div>
         </div>
      </div>
   )
}
export default Footer;