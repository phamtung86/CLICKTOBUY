import React from "react";
import { Component } from "react";
import '../index.css';
class Banner extends Component {
    constructor() {
        super()
        this.state = {
            image : 
                [ "https://hcm.fstorage.vn/images/2024/01/home-page-867-x-400-1--20240112073337.jpg",
                "https://hcm.fstorage.vn/images/2024/01/tan-phu_home-banner-867x400px-20240111102123.png",
                "https://hcm.fstorage.vn/images/2024/01/home-banner-867-x-400-20240105021214.png",
                "https://hcm.fstorage.vn/images/2024/01/homebanner-867x400px-1-1--20240109182444.png",
                "https://hcm.fstorage.vn/images/2024/01/867x400px-1--20240103022530.jpg",
                "https://hcm.fstorage.vn/images/2024/01/867x400-3--20240112103501.jpg",
                "https://hcm.fstorage.vn/images/2024/01/867x400-4--20240112103533.jpg"
               ],
            image_two : [
                "https://hcm.fstorage.vn/images/2024/01/sub-banner-614-x-397-20240105021150.png",
                "https://hcm.fstorage.vn/images/2023/05/614x397_online-01-1--20230505011530.jpg"
            ]
            
        }
    }
    changeImage = () => {
        const getEle = document.querySelector('.banner__change');
        const length = this.state.image.length;
        let current = 0;
        setInterval(() => {
            if(current === length -1 ){
                current = 0;
                getEle.style.transform = `translateX(0px)`
            } 
            else {
                current ++;
                let width = 800;
                getEle.style.transform = `translateX(${width * -1 * current}px)`
            }
        }, 5000)
    }    
    render() {
        return (
            <div className="banner">
                    <div className="banner--all">
                        <div className="banner--first">                   
                        <div className="banner__change" onLoad={this.changeImage}>
                        {this.state.image.map((item, index) => (
                            <img className="image--banner" src={item} alt="Hinh anh quan cao"/>
                        ))}
                        </div>                   
                        </div>
                        <div className="banner--two">
                            <div className="two--first">
                                <img className="image--two" src={this.state.image_two[0]} alt="Hinh anh quang cao"/>
                            </div>
                            <div className="two--second">
                                <img className="image--two" src={this.state.image_two[1]} alt="Hinh anh quang cao"/>
                            </div>
                            
                        </div>
                    </div>
            </div>

        )
    }
}
export default Banner