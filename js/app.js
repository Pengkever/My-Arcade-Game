// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    this.x = UNIT_X * (-1);
    // 使得对象随机出现在三块石板路线上。
    this.y = Math.round(Math.random() * 2) * UNIT_Y + 60;
    // 获得不小于1的随机速度
    this.speed = Math.round(Math.random() * 10) * 10 + 1;

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed * count;
    // 扩大enemy.x的范围界限，进出更平滑
    if (this.x > LIMIT_RIGHT + UNIT_X) {
        this.x = UNIT_X * (-1);
        // 随机更改对象路线，达到路线上对象速度改变的效果
        this.y = Math.round(Math.random() * 2) * UNIT_Y + 60;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 碰撞检测函数
Enemy.prototype.checkCollisions = function() {
    if (this.x < player.x && this.x + UNIT_X > player.x && this.y < player.y && this.y + UNIT_Y > player.y) {
        player.x = PLAYER_INIT_X;
        player.y = PLAYER_INIT_Y;
    }
}


// 现在实现你自己的玩家类
var Player = function() {
    this.x = PLAYER_INIT_X;
    this.y = PLAYER_INIT_Y;
    // 随机获得player的模型
    this.sprite = playerModels[Math.round(Math.random() * 4)];
}

// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update = function(){
    // 设定角色位置超出右、下、左边界就被重置到初始位置（预留上边界作为通关判断）
    if (this.x < LIMIT_LEFT || this.x > LIMIT_RIGHT || this.y > LIMIT_BOTTOM) {
        this.x = PLAYER_INIT_X;
        this.y = PLAYER_INIT_Y;
    };
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(op){
    switch (op) {
        case 'left' :
            this.x -=  UNIT_X;
            break;
        case 'right' :
            this.x +=  UNIT_X;
            break;
        case 'up' :
            this.y -=  UNIT_Y;
            break;
        case 'down' :
            this.y +=  UNIT_Y;
    }
}

// 增加通关函数
Player.prototype.passed = function () {
    count += 1;
    // 用变量tmp暂存键盘监听函数
    var tmp = Player.prototype.handleInput;
    // 将键盘监听事件暂时移除
    Player.prototype.handleInput = function() {};
    // 隐藏tips
    $('.tips').addClass('display-none');
    // 呈现通关样式
    $('.passed').addClass('display-block');
    $('#continue').click(function() {
        $('#count').text(count);
        // 隐藏公关样式
        $('.passed.display-block').removeClass('display-block');
        // 呈现tips
        $('.tips.display-none').removeClass('display-none');
        // 开始下一关后继续，还原监听事件
        Player.prototype.handleInput = tmp;
    });
}


// 游戏场景基本单元的绘制单位
const UNIT_X = 101;
const UNIT_Y = 83;


// 声明游戏边界，图形本身的宽高，及从左上角绘制原则，在制定下、右边界需要已左上为原点减去一个宽或高。
const LIMIT_LEFT = 0;
const LIMIT_TOP = 0;
const LIMIT_RIGHT = 4 * UNIT_X;
const LIMIT_BOTTOM = 5 * UNIT_Y;



// Player角色初始位置
const PLAYER_INIT_X = 2 * UNIT_X;
// 经调整，减去10，刚好使得Player对象图形看上去处于背景模块中心，更符合视觉习惯。
const PLAYER_INIT_Y = 5 * UNIT_Y - 10;


// 关卡计算，每通过一关，enemy数量家1，速度加10
let count = 1;


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 初始化，enemy数量
const ENEMIES = 3;

var allEnemies = [];
for (var i = 0; i < ENEMIES; i++) {
    allEnemies.push(new Enemy());
}


// 把玩家对象放进一个叫 player 的变量里面
var playerModels = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png',]
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



