log = console.log;
var cdncss = {
    'bulma':"https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css",
    'pure':'https://cdnjs.cloudflare.com/ajax/libs/pure/1.0.0/pure-min.css',
};
var cdnjs = {
    'dexie': 'https://unpkg.com/dexie@latest/dist/dexie.js',
    'vue': 'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
    'jquery': 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
};
/*load css and js */
cdnjsId.innerHTML=`<option>loadjs</option>`;
cdncssId.innerHTML=`<option>loadcss</option>`;
for(let cdnname of ['cdnjs','cdncss']){
    let cdnnode = window[cdnname+'Id'];
    let cdnvar = window[cdnname];
    for(let k in window[cdnname]){
        cdnnode.innerHTML+=`<option>${k}</option>`;
    }
    cdnnode.onchange = function(){
        let src = cdnvar[this.value];
        if(!src){return}
        if(cdnname==='cdnjs'){
            h.value = `<script src="${src}"></`+`script>\n`+ h.value;
        }else{
            h.value = `<link rel="stylesheet" href="${src}">\n`+ h.value;
        }
    };
}
document.addEventListener('keydown', e=>{
    if(e.key==='F5'){
        run();
    }
    if(e.target.tagName === 'TEXTAREA'){
        var target = e.target;   
        if(e.ctrlKey){
            if(e.ctrlKey && e.keyCode===85) {
                var start = target.selectionStart;   
                var end = target.selectionEnd;
                var start = target.value.slice(0, start).lastIndexOf('\n')+1;
                target.value=target.value.slice(0, start) + target.value.slice(end);
                target.selectionStart = target.selectionEnd = start;
                e.preventDefault();
            }else if(e.ctrlKey && e.code==='KeyW') {
                var start = target.selectionStart;   
                var end = target.selectionEnd;
                let m = target.value.slice(0, start).match(/(\s*\S+\s*|\s+|.)$/);
                if(m){
                    target.value=target.value.slice(0, m.index) + target.value.slice(end);
                    target.selectionStart = target.selectionEnd = m.index;
                }
                e.preventDefault();
            }else if(e.keyCode===9){


            }
        }else{
            if(e.shiftKey){
                console.log(e);
                if (e.keyCode === 9) {
                    let eles = [h,j,c];
                    for(const [i,ele] of eles.entries()){
                        if(document.activeElement === ele){
                            eles[(i+1)%3].focus();
                            e.preventDefault();
                            break;
                        }
                    }
                }
            }else{
                if (e.keyCode === 9) {
                    var start = target.selectionStart;   
                    var end = target.selectionEnd;
                    target.value=target.value.slice(0, start) + "\t" + target.value.slice(end);
                    target.selectionStart = target.selectionEnd = start + 1;
                    e.preventDefault();
                } 
            }
        }
    }
});
function srcdoc(html){
    var html_src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    i.src = html_src;
}
function run(){ 
    var html=h.value+'<style>'+c.value+'</style><script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>'+j.value+'<\/script>';
    srcdoc(html)
}
function open_page(type){
    let h = `${i.srcdoc}`;
    console.log(h);
    let page = window.open();
    page.document.write(h);
}
function copy_html(type){
    if(type === 'page'){
        text = `${i.srcdoc}`;
    } else if(type=== 'editor'){
        let srcdoc = i.srcdoc;
        i.srcdoc = '';
        for(let node of [h,c,j]){
            node.innerText = node.value;
        }
        text = `data:text/html,${document.documentElement.innerHTML}`;
        i.srcdoc = srcdoc;
    }
    if(copy(text)){
        msg.innerText = `copy ${type} success!`;
        setTimeout(v=>msg.innerText='',2000);
    }
}
function copy(text) {
    var node = document.createElement('textarea');
    node.innerHTML = text;
    document.body.appendChild(node);
    node.select();
    var result = document.execCommand('copy');
    document.body.removeChild(node);
    return result;
}
run();

document.body.oninput = ()=>{
    autorun.checked && run()
}
