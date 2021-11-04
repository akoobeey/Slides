// OOП

class CAROUSEL{
    constructor(obj){
        this.inner = document.querySelector(obj.el.in)
        this.slides = [...this.inner.children]
        this.active = obj.active
        this.direction = obj.direction.toUpperCase() === "X" ? "X" : "Y"
        this.speed = obj.speed <1000 && obj.speed <=300 ? obj.speed : 1000
        this.prev = document.querySelector(obj.btn.prev)
        this.next = document.querySelector(obj.btn.next)
        this.selfSpeed = obj.selfSpeed
        
        this.width = this.minWidth()
        this.height = this.minHeight()
        
        this.size = this.direction === "X" ? this.width : this.height
        
        
        this.inner.style = `
        width: ${this.width}px;
        height: ${this.height}px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        `
        this.slides.forEach((el,i)=>{
            el.style = `
            width: 100%;
            height: 100%;
            position: absolute;
            object-fit: cover;
            `
            if (i !== this.active) {
                el.style.transform = `translate${this.direction}(${this.size}px)`
                el.style.transition = `0s`
            }
    
        })
        this.prev.style = `
        width: 100px;
        padding-top: 5px;
        padding-bottom: 5px;
        background: black;
        color: white;
        text-transform: capitalize;
        `
        this.next.style = `
        width: 100px;
        padding-top: 5px;
        padding-bottom: 5px;
        background: black;
        color: white;
        text-transform: capitalize;
        `
        this.prev.addEventListener('click', () => this.leftOrRight(this.prev))
        this.next.addEventListener('click', () => this.leftOrRight(this.next))
        // setInterval(() => {
        //     this.leftOrRight(this.prev)
        // }, this.selfSpeed);
    }
    
    
    minWidth(){
        return Math.min(...this.slides.map(el=>el.clientWidth + 520))
    }
    minHeight(){
        return Math.min(...this.slides.map(el=>el.clientHeight + 300))
    }
    
    leftOrRight(slide){
        slide.disabled = true;
        
        setTimeout(() => {
        slide.disabled = false;
            
        }, 1000);
        
        let aside = slide === this.next ? -this.size : this.size
        this.slides.forEach((el, i)=>{
            el.style.transition = "0s"
            if (i !== this.active) {
                el.style.transform = `translate${this.direction}(${-aside}px)`
            }
        })
        this.slides[this.active].style.transition = `${this.speed}ms linear`
        this.slides[this.active].style.transform = `translate${this.direction}(${aside}px)`
        if (slide === this.next) {
            this.active++
            if (this.active >= this.slides.length) {
                this.active = 0
            }
        } else if (slide === this.prev) {
            this.active--
            if ( this.active < 0) {
                this.active =  this.slides.length - 1
            }
        }  
        this.slides[this.active].style.transition = `${this.speed}ms linear`
        this.slides[this.active].style.transform = `translate${this.direction}(0px)`
    }
    
}

const slider = new CAROUSEL ({
    el:{
        in: '.inner'
    },
    btn:{
        prev: '.prev',
        next: '.next'  
    },
    direction: 'X',
    speed : 1000,
    selfSpeed: 5000,
    active: 0,
    
})

const slider2 = new CAROUSEL ({
    el:{
        in: '.footer__inner'
    },
    btn:{
        prev: '.prev2',
        next: '.next2'  
    },
    direction: 'y',
    speed : 1000,
    selfSpeed: 5000,
    active: 0,
    
})