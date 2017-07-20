class Draw {
    // option 绘制参数
    constructor(cobj, option) {
        this.cobj = cobj;
        this.color = option.color;
        this.width = option.width;
        this.style = option.style;
    }
    //初始化画图样式
    init() {
        this.cobj.strokeStyle = this.color;
        this.cobj.fillStyle = this.color;
        this.cobj.lineWidth = this.width;
    }
    // 矩形
    rect(ox, oy, mx, my) {
        this.init()
        this.cobj.beginPath();
        this.cobj.rect(ox, oy, mx - ox, my - oy)
        this.cobj[this.style]();
    }
    // 线
    line(ox, oy, mx, my) {
        this.init()
        this.cobj.beginPath();
        this.cobj.moveTo(ox, oy);
        this.cobj.lineTo(mx, my)
        this.cobj.stroke()
    }
    //内切圆
    circlein(ox, oy, mx, my) {
        this.init();
        this.cobj.save();
        this.cobj.translate(ox,oy);
        var r=Math.abs(ox-mx)>Math.abs(oy-my)?Math.abs(oy-my)/2:Math.abs(ox-mx)/2;
        this.cobj.beginPath();
        this.cobj.arc(mx>ox?r:-r,my>oy?r:-r,r,0,2*Math.PI);
        this.cobj[this.style]();
        this.cobj.restore();
    }
    // 外接圆
    circleout(ox, oy, mx, my) {
        this.init();
        this.cobj.save();
        this.cobj.translate(ox,oy);
        this.cobj.beginPath();
        var r=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2))/2;
        this.cobj.arc((mx - ox) / 2, (my > oy )/2,r,0,2*Math.PI);
        this.cobj[this.style]();
        this.cobj.restore();
    }
    //中心圆
    circlecenter(ox, oy, mx, my){
        this.init();
        this.cobj.beginPath();
        this.cobj.save();
        var r=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
        this.cobj.arc(ox,oy,r,0,2*Math.PI);
        this.cobj[this.style]();
    }
    //多边形
    poly(ox, oy, mx, my,si){
        this.init();
        this.cobj.save()
        this.cobj.translate(ox,oy);
        this.cobj.rotate(Math.PI / 2)  // 旋转90 让图形的方向为正
        var angle = Math.PI /si;   //60
        var r=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));  //按中心画的
        var x = Math.cos(angle) * r;
        var y = Math.sin(angle) * r;
        this.cobj.beginPath();
        this.cobj.moveTo(x, y);
        for (var i = 0; i < si; i++) {
            this.cobj.lineTo(x, -y);
            this.cobj.rotate(-angle * 2)//画布旋转120
        }
        this.cobj[this.style]();
        this.cobj.restore()
    }
    //铅笔样式
    pen(ox, oy, mx, my){
        this.init();
        this.cobj.lineTo(mx,my);
        this.cobj.stroke()
    }
    //橡皮擦
    eraser(ox, oy, mx, my){
        this.cobj.clearRect(mx,my,10,10);
    }
}