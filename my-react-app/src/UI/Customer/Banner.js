import React from "react";
import '../../Style/banner.css';

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

    return (
        <div className="banner__ad">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {dataImage.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {dataImage.map((item, index) => (
                        <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img src={item.imageUrl} className="image__box1" alt={item.altText} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="banner__ad--box2">
                <img className="image__box2" src="https://hcm.fstorage.vn/images/2024/07/mbs_online_614x397-20240715015824.jpg" alt="Banner"/>
                <img className="image__box2" src="https://hcm.fstorage.vn/images/2024/09/resize-a1-sub-banner-614x397-20240906104623.png" alt="Banner"/>
            </div>
        </div>
    );
};

export default Banner;
