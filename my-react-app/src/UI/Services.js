import { Component } from "react";
import '../index.css';
import { AncolDrink, MeatAndSeafood} from "./MenuComponent";
import { Vesgetable } from "./MenuComponent";
import { ChemicalProduct } from "./MenuComponent";
import { TakeCarePerson } from "./MenuComponent";
import { Milk } from "./MenuComponent";
import { CandyCake } from "./MenuComponent";
import { Beverage } from "./MenuComponent";
import { NodlleFastFood } from "./MenuComponent";
import { DryFood } from "./MenuComponent";
import { ConvenienceFood } from "./MenuComponent";
class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meatAndSeaFood : 0,
            vesGetable : 0,
            chemicalProduct : 0,
            takeCarePerson : 0,
            milk : 0,
            candyCake : 0,
            ancolDrink : 0,
            beverage : 0,
            nodlleFastFood : 0,
            dryFood : 0,
            convenienceFood : 0,
        }
    }
    displayNone = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((setNone) => ({
            meatAndSeaFood : setNone.meatAndSeaFood = 0,
            vesGetable : setNone.vesGetable = 0,
            chemicalProduct : setNone.chemicalProduct = 0,
            takeCarePerson : setNone.takeCarePerson = 0,
            milk : setNone.milk  = 0,
            candyCake : setNone.candyCake = 0,
            ancolDrink : setNone.ancolDrink = 0,
            beverage : setNone.beverage = 0,
            nodlleFastFood : setNone.nodlleFastFood = 0,
            dryFood : setNone.dryFood = 0,
            convenienceFood : setNone.convenienceFood = 0, 
        }))
    }
    disPlay = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 1,
            vesGetable : prevDisplay.vesGetable = 0,
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayVes = () => {
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            vesGetable : prevDisplay.vesGetable = 2,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayChemical = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 3,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.candyCake = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.disPlay = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
        
    }
    disPlayTakeCarePerson = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 4,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage :prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayMilk = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 5,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayCandyCake = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 6,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayAncolDrink = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 7,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayBeverage = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 8,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0
        }))
    }
    disPlayNodlleFastFood = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 9,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayDryFood = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "transparent"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 10,
            convenienceFood : prevDisplay.convenienceFood = 0,
        }))
    }
    disPlayConvenienceFood = () => {
        const getEle6 = document.querySelector('.item--6');
        Object.assign(getEle6.style, {
            backgroundColor : "transparent"
        })
        const getEle7 = document.querySelector('.item--7');
        Object.assign(getEle7.style, {
            backgroundColor : "transparent"
        })
        const getEle8 = document.querySelector('.item--8');
        Object.assign(getEle8.style, {
            backgroundColor : "transparent"
        })
        const getEle9 = document.querySelector('.item--9');
        Object.assign(getEle9.style, {
            backgroundColor : "transparent"
        })
        const getEle10 = document.querySelector('.item--10');
        Object.assign(getEle10.style, {
            backgroundColor : "transparent"
        })
        const getEle11 = document.querySelector('.item--11');
        Object.assign(getEle11.style, {
            backgroundColor : "transparent"
        })
        const getEle12 = document.querySelector('.item--12');
        Object.assign(getEle12.style, {
            backgroundColor : "transparent"
        })
        const getEle13 = document.querySelector('.item--13');
        Object.assign(getEle13.style, {
            backgroundColor : "transparent"
        })
        const getEle14 = document.querySelector('.item--14');
        Object.assign(getEle14.style, {
            backgroundColor : "transparent"
        })
        const getEle15 = document.querySelector('.item--15');
        Object.assign(getEle15.style, {
            backgroundColor : "transparent"
        })
        const getEle16 = document.querySelector('.item--16');
        Object.assign(getEle16.style, {
            backgroundColor : "rgb(0,183,255)"
        })
        this.setState((prevDisplay) => ({
            chemicalProduct : prevDisplay.chemicalProduct = 0,
            vesGetable : prevDisplay.vesGetable = 0,
            meatAndSeaFood : prevDisplay.meatAndSeaFood = 0,
            takeCarePerson : prevDisplay.takeCarePerson = 0,
            milk : prevDisplay.milk = 0,
            candyCake : prevDisplay.candyCake = 0,
            ancolDrink : prevDisplay.ancolDrink = 0,
            beverage : prevDisplay.beverage = 0,
            nodlleFastFood : prevDisplay.nodlleFastFood = 0,
            dryFood : prevDisplay.dryFood = 0,
            convenienceFood : prevDisplay.convenienceFood = 11,
        }))
    }
    render() {
        return (
            <div className="services__nav">
                <div className="nav--all">
                    <div className="nav--menu">
                        <div className="menu--title--icon">
                            <div className="menu--icon"><i class="fa-solid fa-bars"></i></div>
                            <div className="menu--title">Danh mục sản phẩm</div>
                        </div>
                        <div className="menu--list--component">
                        <div className="main--menu--component">
                        <div className="menu--main">
                        <ul className="menu--list">
                            <li className="menu--item item--1">
                                <a className="menu--item--click" href="#" onMouseEnter={this.displayNone}>
                                    <div className="item--name">Tết siêu sale</div>
                                </a>
                            </li>
                            <li className="menu--item item--2">
                                <a className="menu--item--click" href="#" onMouseEnter={this.displayNone}>
                                    <div className="item--name">Nhà sạch tết sang</div>
                                </a>
                            </li>
                            <li className="menu--item item--3">
                                <a className="menu--item--click" href="#" onMouseEnter={this.displayNone}>
                                    <div className="item--name">Ngọt ngào ngày Tết</div>
                                    
                                </a>
                            </li>
                            <li className="menu--item item--4">
                                <a className="menu--item--click" href="#" onMouseEnter={this.displayNone}>
                                    <div className="item--name">Sản phẩm khuyến mại</div>
                                
                                </a>
                            </li>
                            <li className="menu--item item--5">
                                <a className="menu--item--click" href="#" onMouseEnter={this.displayNone}>
                                    <div className="item--name">Ưu đãi hội viên</div>
                                </a>
                                
                            </li>
                            <li className="menu--item item--6" onMouseEnter={this.disPlay} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Thịt - Hải sản tươi</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--7" onMouseEnter={this.disPlayVes} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Rau - Củ - Trái cây</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--8" onMouseEnter={this.disPlayChemical} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Hóa phẩm - Tẩy rửa</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--9" onMouseEnter={this.disPlayTakeCarePerson} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Chăm sóc cá nhân</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--10" onMouseEnter={this.disPlayMilk} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Sữa các loại</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--11" onMouseEnter={this.disPlayCandyCake} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Bánh kẹo</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--12" onMouseEnter={this.disPlayAncolDrink} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Đồ uống có cồn</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--13" onMouseEnter={this.disPlayBeverage} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Đồ uống - Giải khát</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--14" onMouseEnter={this.disPlayNodlleFastFood} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Mì - Thực phẩm ăn liền</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--15" onMouseEnter={this.disPlayDryFood} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Thực phẩm khô</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                            <li className="menu--item item--16" onMouseEnter={this.disPlayConvenienceFood} >
                                <a className="menu--item--click" href="#">
                                    <div className="item--name">Thực phẩm chế biến</div>
                                    <span className="menu--item-icon"><i class="fa-solid fa-chevron-right"></i></span>
                                </a>
                            </li>
                        </ul>
                        </div>
                        <div className="menu--component">
                            {this.state.meatAndSeaFood === 1 && <MeatAndSeafood />}
                            {this.state.vesGetable === 2 && <Vesgetable/>}
                            {this.state.chemicalProduct === 3 && <ChemicalProduct/>}
                            {this.state.takeCarePerson === 4 && <TakeCarePerson/>}
                            {this.state.milk === 5 && <Milk/>}
                            {this.state.candyCake === 6 && <CandyCake/>}
                            {this.state.ancolDrink === 7 && <AncolDrink/>}
                            {this.state.beverage === 8 && <Beverage/>}
                            {this.state.nodlleFastFood === 9 && <NodlleFastFood/>}
                            {this.state.dryFood === 10 && <DryFood/>}
                            {this.state.convenienceFood === 11 && <ConvenienceFood/>}
                        </div>
                    </div>
                        </div>

                    </div>
                    <div className="nav--support">
                    <div className="support--news">
                        <div className="news--icon"><i class="fa-regular fa-envelope"></i></div>
                        <div className="news--title">Tin tức CLICKTOBUY</div>
                    </div>
                    <div className="support--advise">
                        <div className="advise--icon"><i class="fa-solid fa-headset"></i></div>
                        <div className="advise--title">Tư vấn bán hàng</div>
                    </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Services