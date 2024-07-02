import React from "react";
import '../Style/banner.css';
import Slider from 'react-slick';

const Banner = () => {
    const dataImage = [
        {
            id: 1,
            imageUrl: 'https://hcm.fstorage.vn/images/2023/04/homepage_867x400-20230406100727.jpg',
            altText: 'Hình ảnh quảng cáo',
        },
        {
            id: 2,
            imageUrl: 'https://hcm.fstorage.vn/images/2024/06/san-deal_5-6-24_867-400-1--20240620061048.jpg',
            altText: 'Hình ảnh quảng cáo',
        },
        {
            id: 3,
            imageUrl: 'https://hcm.fstorage.vn/images/2024/06/240515_sub-banner_867x400-egg-copy-20240603015608.jpg',
            altText: 'Hình ảnh quảng cáo',
        },
        {
            id: 4,
            imageUrl: 'https://hcm.fstorage.vn/images/2024/06/vinamilk_867x400px-20240619020631.jpg',
            altText: 'Hình ảnh quảng cáo',
        },
        {
            id: 5,
            imageUrl: 'https://hcm.fstorage.vn/images/2024/06/daesang-tpk-20240619020508.png',
            altText: 'Hình ảnh quảng cáo',
        },
    ];

    const dataBanner = [
        {
            id: 1,
            imageURL: 'https://hcm.fstorage.vn/images/2023/02/867x400_web.jpg',
            altText: "Banner 4"
        },
        {
            id: 2,
            imageURL: 'https://hcm.fstorage.vn/images/2023/02/867x400_web.jpg',
            altText: 'Banner 5'
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="banner">
            <div className="banner--all">
                <div className="banner--first">
                    <Slider {...settings} className="banner__slider">
                        {dataImage.map((item) => (
                            <div key={item.id} className="banner__change">
                                <img src={item.imageUrl} alt={item.altText} className="image--banner" />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="banner--two">
                   {dataBanner.map((item) => (
                       <div className="two--first" key={item.id}>
                           <img className="image--two" alt={item.altText} src={item.imageURL}/>
                       </div>
                   ))}             
                </div>
            </div>
        </div>
    );
};

export default Banner;
