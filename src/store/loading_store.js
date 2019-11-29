import {observable,computed,action} from 'mobx'


class loading_store{
    @observable show=false

    @action ajaxStart(){
        this.show=true
    }

    @action ajaxEnd(wait=0){
        setTimeout(()=>{
            this.show=false
        },wait)
    }
}

const loadingStore=new loading_store();

export default loadingStore