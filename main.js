
    function temp(keys, bbl){
        this.all = new Set(keys)
        this.functions = []
        this.bbl = bbl;
        this.called = false;
        return this
    }
    temp.prototype.pressed = new Set()

function KeyBinder(e, keys, repeat = true) {
    vars = new temp(keys, repeat)
    function keydown(vars){
        return function (e) {
            if(vars.all.has(e.keyCode)){
                vars.pressed.add(e.keyCode);
                let size = vars.all.size;
                [...vars.all].forEach(x =>{
                    if(vars.pressed.has(x))
                        --size;
                })
                if((vars.bbl == false && vars.called == false || vars.bbl == true) &&
                        vars.pressed.size == vars.all.size && size == 0
                        ){
                    vars.functions.forEach(f =>{
                        f();
                    })
                    vars.called = true;
                }
            }
        }
    }
    function ret(vars, up, down){
        this.bind = function(x){
            vars.functions.push(x);
        }
        return this;
    }
    function keyup(vars){
        return function (e) {
            vars.pressed.delete(e.keyCode)
            vars.called = false;
        }

    };

    e.addEventListener('keydown', keydown(vars));
    e.addEventListener('keyup', keyup(vars));
    return ret(vars, 0,0)
}
